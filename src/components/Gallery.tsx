import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { Camera, Grid2X2, Move, Pause, Play, X } from "lucide-react";
import { useDialog } from "../hooks/useDialog";
import { useDecorativeMotion } from "../hooks/useDecorativeMotion";
const InfiniteDrift2 = lazy(
  () => import("@/components/lightswind/infinite-drift-2"),
);
export interface WorkPhoto {
  id: string;
  src: string;
  title: string;
  alt: string;
  caption?: string;
}
function readPhotos(value: unknown): WorkPhoto[] {
  if (!Array.isArray(value)) throw new Error("Daftar foto tidak valid");
  const ids = new Set<string>();
  return value.map((item) => {
    if (
      !item ||
      typeof item !== "object" ||
      typeof item.id !== "string" ||
      !item.id.trim() ||
      ids.has(item.id) ||
      typeof item.src !== "string" ||
      !/^(\/(?!\/)|https:\/\/)/.test(item.src) ||
      typeof item.title !== "string" ||
      !item.title.trim() ||
      typeof item.alt !== "string" ||
      !item.alt.trim()
    ) {
      throw new Error("Data foto belum lengkap");
    }
    ids.add(item.id);
    return {
      id: item.id,
      src: item.src,
      title: item.title,
      alt: item.alt,
      caption: typeof item.caption === "string" ? item.caption : undefined,
    };
  });
}
function Photo({
  photo,
  className = "",
}: {
  photo: WorkPhoto;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div
        className={`flex items-center justify-center bg-zinc-900 text-zinc-400 p-5 text-sm ${className}`}
      >
        Foto belum tersedia: {photo.title}
      </div>
    );
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
export function Gallery() {
  const section = useRef<HTMLElement>(null);
  const [nearby, setNearby] = useState(false);
  const [photos, setPhotos] = useState<WorkPhoto[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [grid, setGrid] = useState(false);
  const [paused, setPaused] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [activePhoto, setActivePhoto] = useState<WorkPhoto | null>(null);
  const reduced = useReducedMotion();
  const decorativeMotion = useDecorativeMotion();
  const lenis = useLenis();
  const wasStopped = useRef<boolean | undefined>(undefined);
  const dialog = useDialog(!!activePhoto, () => setActivePhoto(null));
  const urls = useMemo(() => photos.map((photo) => photo.src), [photos]);
  const dragChange = useCallback(
    (dragging: boolean) => {
      if (dragging) {
        wasStopped.current = lenis?.isStopped;
        lenis?.stop();
      } else if (wasStopped.current !== undefined) {
        if (!wasStopped.current) lenis?.start();
        wasStopped.current = undefined;
      }
    },
    [lenis],
  );
  useEffect(
    () => () => {
      if (wasStopped.current === false) lenis?.start();
    },
    [lenis],
  );
  useEffect(() => {
    const node = section.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearby(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!nearby) return;
    const abort = new AbortController();
    fetch("/hasil-karya/gallery.json", { signal: abort.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Daftar foto tidak tersedia");
        return response.json();
      })
      .then((value) => {
        setPhotos(readPhotos(value));
        setStatus("ready");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setStatus("error");
      });
    return () => abort.abort();
  }, [nearby]);
  const showGrid = grid || reduced || unavailable;
  return (
    <section
      ref={section}
      id="galeri"
      aria-labelledby="gallery-title"
      className="relative z-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/10"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-7">
        <div>
          <p className="flex items-center gap-2 text-red-400 font-mono text-xs tracking-wider uppercase mb-2">
            <Camera size={15} aria-hidden="true" /> Galeri karya visual
          </p>
          <h2
            id="gallery-title"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight"
          >
            Foto &amp; Karya Visual
          </h2>
          <p className="text-zinc-400 text-sm mt-3 max-w-xl">
            Pilihan hasil fotografi dan desain saya. Lihat detail foto melalui
            tampilan daftar.
          </p>
        </div>
        {!!photos.length && (
          <div className="flex flex-wrap gap-2">
            {!reduced && !unavailable && (
              <button
                type="button"
                onClick={() => setGrid((value) => !value)}
                aria-pressed={!!showGrid}
                className="gallery-control"
              >
                <Grid2X2 size={15} aria-hidden="true" />
                {showGrid ? "Galeri interaktif" : "Lihat semua foto"}
              </button>
            )}
            {!showGrid && decorativeMotion && (
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-pressed={paused}
                className="gallery-control"
              >
                {paused ? (
                  <Play size={15} aria-hidden="true" />
                ) : (
                  <Pause size={15} aria-hidden="true" />
                )}
                {paused ? "Lanjutkan gerak" : "Jeda gerak"}
              </button>
            )}
          </div>
        )}
      </div>
      {status !== "ready" ? (
        <div className="gallery-empty" role="status">
          <Camera size={32} className="text-red-400" aria-hidden="true" />
          <p>
            {status === "error"
              ? "Galeri belum dapat dimuat. Silakan coba kembali nanti."
              : "Menyiapkan galeri…"}
          </p>
        </div>
      ) : !photos.length ? (
        <div className="gallery-empty">
          <Camera size={38} className="text-red-400" aria-hidden="true" />
          <p className="text-white font-semibold text-lg">
            Koleksi karya sedang disiapkan
          </p>
          <p className="text-zinc-400 text-sm max-w-md">
            Pilihan hasil fotografi dan desain akan ditampilkan di sini.
          </p>
        </div>
      ) : (
        <>
          {showGrid ? (
            <>
              {unavailable && (
                <p role="status" className="text-zinc-400 text-sm mb-5">
                  Galeri ditampilkan dalam daftar foto.
                </p>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {photos.map((photo) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setActivePhoto(photo)}
                    aria-label={`Lihat foto: ${photo.title}`}
                    className="text-left rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-red-400/60 transition-colors"
                  >
                    <Photo
                      photo={photo}
                      className="w-full aspect-square object-cover"
                    />
                    <span className="block p-3 text-xs sm:text-sm font-semibold text-white">
                      {photo.title}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div
                className="w-full h-[420px] sm:h-[620px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950"
                data-gallery-drift
              >
                <Suspense
                  fallback={
                    <div role="status" className="gallery-empty h-full">
                      Memuat galeri interaktif…
                    </div>
                  }
                >
                  <InfiniteDrift2
                    images={urls}
                    curve={0.35}
                    curveRadius={1.5}
                    zoom={0.08}
                    tileWidth={220}
                    tileHeight={220}
                    gap={18}
                    borderRadius={18}
                    autoScrollX={0.4}
                    autoScrollY={0.15}
                    enableDrag={true}
                    enableWheel={true}
                    vignette={0.25}
                    paused={paused || !decorativeMotion || !!activePhoto}
                    onUnavailable={() => setUnavailable(true)}
                    onDragChange={dragChange}
                  />
                </Suspense>
              </div>
              <p className="flex items-center gap-2 text-zinc-500 text-xs mt-4">
                <Move size={14} aria-hidden="true" />
                Geser atau gunakan tombol panah untuk menjelajah. Wheel di dalam
                galeri menggeser foto; scroll di luar galeri melanjutkan
                halaman.
              </p>
            </>
          )}
        </>
      )}
      {activePhoto &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
            onClick={(event) => {
              if (event.target === event.currentTarget) setActivePhoto(null);
            }}
          >
            <div
              ref={dialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby="photo-dialog-title"
              tabIndex={-1}
              className="relative w-full max-w-5xl max-h-[90dvh] overflow-y-auto rounded-2xl bg-zinc-950 border border-white/15 p-4 sm:p-6"
            >
              <div className="flex justify-between items-center gap-4 mb-4">
                <h3
                  id="photo-dialog-title"
                  className="text-white font-semibold"
                >
                  {activePhoto.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  aria-label="Tutup foto"
                  className="gallery-control shrink-0"
                >
                  <X size={18} />
                </button>
              </div>
              <Photo
                photo={activePhoto}
                className="w-full max-h-[65dvh] object-contain"
              />
              {activePhoto.caption && (
                <p className="text-zinc-400 text-sm mt-4">
                  {activePhoto.caption}
                </p>
              )}
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
