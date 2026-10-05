import { useEffect, useMemo, useState } from "react";
import { SlidingLogoMarquee } from "@/components/lightswind/sliding-logo-marquee";
interface BrandLogo {
  id: string;
  name: string;
  src: string;
  href?: string;
}
function Logo({ brand }: { brand: BrandLogo }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className="text-white font-semibold text-sm">{brand.name}</span>
  ) : (
    <img
      src={brand.src}
      alt={`Logo ${brand.name}`}
      className="h-10 sm:h-12 w-auto max-w-[140px] object-contain"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
export function BrandSection() {
  const [brands, setBrands] = useState<BrandLogo[]>([]),
    [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    const abort = new AbortController();
    fetch("/brands/logos.json", { signal: abort.signal })
      .then((response) => {
        if (!response.ok) throw Error("Logo tidak tersedia");
        return response.json();
      })
      .then((value) => {
        if (!Array.isArray(value)) throw Error("Daftar logo tidak valid");
        const ids = new Set<string>();
        const parsed: BrandLogo[] = value.map((brand) => {
          if (
            !brand ||
            typeof brand.id !== "string" ||
            !brand.id.trim() ||
            ids.has(brand.id) ||
            typeof brand.name !== "string" ||
            !brand.name.trim() ||
            typeof brand.src !== "string" ||
            !/^(\/(?!\/)|https:\/\/)/.test(brand.src) ||
            (brand.href &&
              (typeof brand.href !== "string" ||
                !/^https?:\/\//.test(brand.href)))
          )
            throw Error("Logo belum lengkap");
          ids.add(brand.id);
          return {
            id: brand.id,
            name: brand.name,
            src: brand.src,
            href: brand.href || undefined,
          };
        });
        setBrands(parsed);
        setStatus("ready");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setStatus("error");
      });
    return () => abort.abort();
  }, []);
  const items = useMemo(
    () =>
      brands.map((brand) => ({
        id: brand.id,
        content: <Logo brand={brand} />,
        href: brand.href,
      })),
    [brands],
  );
  return (
    <section
      id="brands"
      aria-labelledby="brand-title"
      className="relative z-20 border-y border-white/10 bg-zinc-950/70 px-4 sm:px-6 py-8"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="brand-title"
          className="text-center text-xs font-mono uppercase tracking-[0.15em] text-zinc-400 mb-3"
        >
          Brand yang pernah bekerja sama
        </h2>
        {brands.length > 0 ? (
          <SlidingLogoMarquee
            items={items}
            speed={60}
            height="120px"
            enableBlur={true}
            blurIntensity={2}
            pauseOnHover={true}
            showGridBackground={true}
          />
        ) : (
          <div
            className="min-h-[120px] flex items-center justify-center text-zinc-500 text-sm text-center"
            role="status"
          >
            {status === "loading"
              ? "Menyiapkan logo brand…"
              : status === "error"
                ? "Logo brand belum dapat dimuat."
                : "Daftar kolaborasi sedang disiapkan."}
          </div>
        )}
      </div>
    </section>
  );
}
