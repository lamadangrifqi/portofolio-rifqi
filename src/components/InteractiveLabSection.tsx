import React from "react";
import ReactLazy from "react";
const Sketchbook = ReactLazy.lazy(() => import("./SketchbookDisplay"));
import { BookOpen, Search, RotateCw, ZoomIn } from "lucide-react";

function SketchbookDemo() {
  return (
    <section
      id="lab-content"
      className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs tracking-wider uppercase mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Eksperimen Antarmuka / Demo ThreeUI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Interactive Lab — Sketchbook
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Demo komponen Sketchbook dari ThreeUI dengan aset contoh Singapura.
            Ditampilkan sebagai eksperimen antarmuka; gambar di dalamnya bukan
            karya fotografi saya.
          </p>
        </div>

        {/* Interaction Hints Pill */}
        <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10 text-xs font-mono text-zinc-300">
          <Search className="w-4 h-4 text-amber-400" />
          <span>Tarik halaman / Geser lup pembesar</span>
        </div>
      </div>

      {/* Sketchbook Display Container */}
      <div
        id="sketchbook-frame"
        className="shader-frame relative w-full h-[580px] sm:h-[700px] md:h-[800px] rounded-3xl overflow-hidden border border-white/15 bg-[#ece7dc] shadow-2xl shadow-black/80"
      >
        <React.Suspense
          fallback={<p className="p-6 text-zinc-900">Memuat eksperimen…</p>}
        >
          <Sketchbook assetBaseUrl="/sketchbook/" className="w-full h-full" />
        </React.Suspense>
      </div>

      {/* Feature Footnotes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs">
        <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-start gap-3">
          <RotateCw className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-zinc-200 font-semibold">
              3D Paper Tilt &amp; Drag
            </div>
            <div className="text-[11px] text-zinc-400 mt-0.5">
              Klik dan geser sudut buku untuk membolak-balik halaman dengan
              lengkungan elastis.
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-start gap-3">
          <Search className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-zinc-200 font-semibold">
              Movable Loupe Lens
            </div>
            <div className="text-[11px] text-zinc-400 mt-0.5">
              Kaca pembesar optik mengapung yang dapat digeser bebas untuk
              inspeksi detail grafis.
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-start gap-3">
          <ZoomIn className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-zinc-200 font-semibold">
              Plates &amp; Index TOC
            </div>
            <div className="text-[11px] text-zinc-400 mt-0.5">
              Daftar isi dan katalog plat ilustrasi berurutan untuk referensi
              artistik langsung.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function InteractiveLabSection() {
  const [open, setOpen] = React.useState(false);
  return (
    <section
      id="lab"
      className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Interactive Lab</h2>
          <p className="text-sm text-zinc-400 mt-2">
            Eksperimen Sketchbook dari ThreeUI, memakai aset demo bawaan.
          </p>
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="lab-content"
          onClick={() => setOpen(!open)}
          className="px-5 py-3 rounded-full border border-white/20 bg-white/5 text-sm text-white"
        >
          {open ? "Tutup eksperimen" : "Buka eksperimen"}
        </button>
      </div>
      {open && <SketchbookDemo />}
    </section>
  );
}
