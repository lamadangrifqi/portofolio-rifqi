import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useDialog } from "../hooks/useDialog";
import {
  Globe,
  Camera,
  Palette,
  Play,
  Grid,
  ExternalLink,
  Eye,
  ArrowUpRight,
  Sparkles,
  X,
  Layers,
  CheckCircle2,
  Calendar,
  Tag,
  Share2,
} from "lucide-react";
import {
  PORTFOLIO_ITEMS,
  PORTFOLIO_CATEGORIES,
  PortfolioItem,
  ProjectCategory,
} from "../data/portfolioData";

interface KaryaSectionProps {
  onOpenHireModal?: (serviceId?: string) => void;
}

export function KaryaSection({ onOpenHireModal }: KaryaSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | ProjectCategory
  >("all");
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const dialogRef = useDialog(!!activeItem, () => setActiveItem(null));

  // Filter items based on active category
  const filteredItems =
    selectedCategory === "all"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);

  const getCategoryCount = (categoryId: "all" | ProjectCategory) => {
    if (categoryId === "all") return PORTFOLIO_ITEMS.length;
    return PORTFOLIO_ITEMS.filter((i) => i.category === categoryId).length;
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "web":
        return <Globe className="w-3.5 h-3.5" />;
      case "foto":
        return <Camera className="w-3.5 h-3.5" />;
      case "desain":
        return <Palette className="w-3.5 h-3.5" />;
      case "video":
        return <Play className="w-3.5 h-3.5" />;
      default:
        return <Grid className="w-3.5 h-3.5" />;
    }
  };

  const getCategoryColor = (cat: ProjectCategory) => {
    switch (cat) {
      case "web":
        return "text-sky-400 bg-sky-950/60 border-sky-500/30";
      case "foto":
        return "text-amber-400 bg-amber-950/60 border-amber-500/30";
      case "desain":
        return "text-purple-400 bg-purple-950/60 border-purple-500/30";
      case "video":
        return "text-red-400 bg-red-950/60 border-red-500/30";
      default:
        return "text-zinc-400 bg-zinc-900 border-zinc-700";
    }
  };

  const handleHireClick = (item: PortfolioItem) => {
    if (onOpenHireModal) {
      const mappedService =
        item.category === "web"
          ? "pillar-web"
          : item.category === "desain"
            ? "pillar-design"
            : "pillar-media";
      setActiveItem(null);
      onOpenHireModal(mappedService);
    }
  };

  return (
    <section
      id="karya"
      tabIndex={-1}
      className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-red-400 font-mono text-xs tracking-wider uppercase mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>KATALOG KARYA PILIHAN // PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
            Showcase Karya &amp; Eksplorasi
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Proyek website dan sistem yang saya kerjakan, termasuk pengembangan
            internal. Sampul merupakan identitas proyek; status pengerjaan
            tercantum pada setiap kartu.
          </p>
        </div>

        {/* Live Counter Badge */}
        <div className="flex items-center gap-3 bg-zinc-900/90 border border-white/10 px-4 py-2.5 rounded-2xl shrink-0 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-zinc-400 uppercase leading-none">
              Total Katalog
            </span>
            <span className="text-xs font-bold text-white mt-1">
              {PORTFOLIO_ITEMS.length} Proyek &amp; Pengembangan
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {PORTFOLIO_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = getCategoryCount(cat.id);
          return (
            <button
              key={cat.id}
              id={`filter-tab-${cat.id}`}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 shrink-0 cursor-pointer border ${
                isActive
                  ? "bg-white text-zinc-950 font-bold border-white shadow-lg shadow-white/10 scale-105"
                  : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border-white/10"
              }`}
            >
              <span className={isActive ? "text-red-600" : "text-zinc-400"}>
                {getCategoryIcon(cat.id)}
              </span>
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? "bg-zinc-200 text-zinc-950 font-bold"
                    : "bg-white/10 text-zinc-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Showcase Grid (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          return (
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={`Lihat detail ${item.title}`}
              key={item.id}
              id={`portfolio-card-${item.id}`}
              onClick={() => setActiveItem(item)}
              className="text-left group relative flex flex-col justify-between rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 hover:border-red-500/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-black/80 cursor-pointer"
            >
              {/* Media Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-md ${getCategoryColor(
                      item.category,
                    )}`}
                  >
                    {getCategoryIcon(item.category)}
                    <span>{item.categoryLabel}</span>
                  </span>
                </div>

                {/* Year Indicator */}
                <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300 text-[10px] font-mono px-2.5 py-1 rounded-full">
                  {item.year}
                </div>

                {/* Video Play Overlay if category is video */}
                {item.category === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Hover Quick Action Indicator */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 bg-white text-zinc-950 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  <Eye className="w-3.5 h-3.5 text-red-600" />
                  <span>Lihat Detail</span>
                </div>
              </div>

              {/* Card Information */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="text-[11px] font-mono text-zinc-400 mb-1">
                    {item.clientOrContext}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors tracking-tight font-display mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {item.tagline}
                  </p>
                </div>

                {/* Tags & Action Row */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-zinc-400 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md text-zinc-500">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {item.metricsOrHighlight && (
                    <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
                      <span className="flex items-center gap-1 text-zinc-300 font-medium">
                        <Sparkles className="w-3 h-3 text-red-400" />
                        <span className="truncate">
                          {item.metricsOrHighlight}
                        </span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors shrink-0" />
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox / Project Detail Modal */}
      {activeItem &&
        createPortal(
          <div
            id="project-detail-modal-backdrop"
            data-lenis-prevent
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setActiveItem(null)}
          >
            <div
              id="project-detail-modal-content"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              tabIndex={-1}
              data-lenis-prevent
              className="relative w-full max-w-3xl bg-zinc-950 border border-white/20 rounded-3xl overflow-hidden shadow-2xl shadow-black/95 max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header Bar with Close Button */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(
                      activeItem.category,
                    )}`}
                  >
                    {getCategoryIcon(activeItem.category)}
                    <span>{activeItem.categoryLabel}</span>
                  </span>
                  <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                    • {activeItem.clientOrContext} ({activeItem.year})
                  </span>
                </div>

                <button
                  id="close-project-modal-btn"
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Tutup jendela detail karya"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="overflow-y-auto p-6 space-y-6">
                {/* Main Media Preview Display */}
                <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full max-h-[460px] object-contain mx-auto"
                  />

                  {/* Video Play Overlay if video */}
                  {activeItem.category === "video" && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto mb-3 shadow-2xl animate-pulse">
                          <Play className="w-7 h-7 fill-white ml-1" />
                        </div>
                        <p className="text-xs font-mono text-white bg-black/70 px-3 py-1.5 rounded-full inline-block border border-white/20">
                          {activeItem.metricsOrHighlight ||
                            "Simulasi Preview Video Sinematik"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3
                    id="project-dialog-title"
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-display"
                  >
                    {activeItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-red-400 mt-1">
                    {activeItem.tagline}
                  </p>
                </div>

                {/* Comprehensive Description */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Ringkasan &amp; Pendekatan Eksekusi
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {activeItem.description}
                  </p>
                </div>

                {/* Specifications / Tech Stack Grid */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-red-400" />
                    <span>Lingkup &amp; Teknologi Proyek</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeItem.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/10 text-white border border-white/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons Footer */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
                  <div className="text-xs text-zinc-400">
                    Tertarik dengan pilar karya seperti ini?
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    {activeItem.githubUrl && (
                      <a
                        href={activeItem.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs"
                      >
                        Source GitHub
                      </a>
                    )}
                    {activeItem.liveUrl && (
                      <a
                        href={activeItem.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors"
                      >
                        <span>Kunjungi Website</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => handleHireClick(activeItem)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all cursor-pointer"
                    >
                      <span>Konsultasi Proyek Ini</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
