import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDialog } from "../hooks/useDialog";
import {
  X,
  Mail,
  Send,
  Check,
  Terminal,
  Sparkles,
  ShieldCheck,
  Copy,
  ArrowUpRight,
} from "lucide-react";
import {
  SERVICES_DATA,
  PILLAR_SERVICES,
  createMailtoUrl,
} from "../data/servicesData";

interface HireMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export function HireMeModal({
  isOpen,
  onClose,
  initialServiceId,
}: HireMeModalProps) {
  const [selectedServiceId, setSelectedServiceId] = useState(
    initialServiceId || PILLAR_SERVICES[0].id,
  );
  const [clientName, setClientName] = useState("");
  const [projectNote, setProjectNote] = useState("");
  const [timelineBudget, setTimelineBudget] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const dialogRef = useDialog(isOpen, onClose);
  const [copyError, setCopyError] = useState(false);

  // Sync initialServiceId when modal opens with a specific service
  useEffect(() => {
    if (isOpen) {
      const valid =
        PILLAR_SERVICES.some((p) => p.id === initialServiceId) ||
        SERVICES_DATA.some((s) => s.id === initialServiceId);
      setSelectedServiceId(valid ? initialServiceId! : PILLAR_SERVICES[0].id);
      setIsCopied(false);
      setCopyError(false);
    }
  }, [initialServiceId, isOpen]);

  if (!isOpen) return null;

  // Find either pillar service or detailed service item
  const foundPillar = PILLAR_SERVICES.find((p) => p.id === selectedServiceId);
  const foundSub = SERVICES_DATA.find((s) => s.id === selectedServiceId);

  const selectedTitle = foundPillar
    ? foundPillar.title
    : foundSub
      ? `${foundSub.categoryLabel} — ${foundSub.title}`
      : "Layanan Kreatif & Web";

  const generatedMessage = `Halo Rifqi Lamadang,

${clientName.trim() ? `Nama Pengirim / Brand: ${clientName.trim()}` : "Inquiry Proyek Baru"}
Layanan yang Dipilih: ${selectedTitle}
${timelineBudget.trim() ? `Target Timeline / Estimasi Budget: ${timelineBudget.trim()}\n` : ""}${
    projectNote.trim() ? `\nRingkasan Kebutuhan:\n${projectNote.trim()}\n` : ""
  }
Mohon informasi ketersediaan jadwal pengerjaan, estimasi biaya, dan langkah awal diskusinya. Terima kasih!`;

  const emailSubject = `Inquiry Proyek: ${selectedTitle}${clientName.trim() ? ` - ${clientName.trim()}` : ""}`;
  const mailtoUrl = createMailtoUrl(emailSubject, generatedMessage);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopyError(false);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setCopyError(true);
    }
  };

  return createPortal(
    <div
      id="hire-me-modal-backdrop"
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="hire-me-modal-content"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="hire-dialog-title"
        tabIndex={-1}
        data-lenis-prevent
        className="relative w-full max-w-2xl bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/90 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-red-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-red-950/20 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between gap-3 pb-5 mb-5 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] font-mono font-semibold tracking-widest text-red-400 uppercase">
                DIRECT PROTOCOL // PROJECT BRIEF DISPATCH
              </span>
            </div>
            <h3
              id="hire-dialog-title"
              className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2 font-display"
            >
              <span>Konsultasi &amp; Mulai Proyek</span>
              <Sparkles className="w-4 h-4 text-red-400" />
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-4">
          {/* Service Selector */}
          <div>
            <label
              htmlFor="modal-service-select"
              className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2"
            >
              Pilih Pilar / Kebutuhan Layanan
            </label>
            <select
              id="modal-service-select"
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
            >
              <optgroup label="3 Pilar Layanan Utama">
                {PILLAR_SERVICES.map((p) => (
                  <option key={p.id} value={p.id}>
                    Pilar: {p.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Spesifikasi Khusus">
                {SERVICES_DATA.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.categoryLabel}: {s.title}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Client Name Input */}
          <div>
            <label
              htmlFor="modal-name-input"
              className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2"
            >
              Nama Anda / Nama Brand (Opsional)
            </label>
            <input
              id="modal-name-input"
              type="text"
              placeholder="Contoh: Budi / Brand Fashion XYZ"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          {/* Target Timeline / Budget Input */}
          <div>
            <label
              htmlFor="modal-timeline-input"
              className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2"
            >
              Target Timeline / Ekspektasi Jadwal (Opsional)
            </label>
            <input
              id="modal-timeline-input"
              type="text"
              placeholder="Contoh: Rilis akhir bulan depan / Q3 2026"
              value={timelineBudget}
              onChange={(e) => setTimelineBudget(e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          {/* Project Brief Input */}
          <div>
            <label
              htmlFor="modal-note-input"
              className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2"
            >
              Ringkasan Kebutuhan Proyek (Opsional)
            </label>
            <textarea
              id="modal-note-input"
              rows={3}
              placeholder="Contoh: Butuh web landing page untuk launching produk baru bulan depan, desain minimalis dengan fitur formulir order..."
              value={projectNote}
              onChange={(e) => setProjectNote(e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500 transition-colors resize-none"
            />
          </div>

          {/* Message Preview */}
          <div className="bg-zinc-900/90 rounded-2xl p-4 border border-white/10 mt-2">
            <div className="flex items-center justify-between mb-2 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-red-400" />
                <span>PREVIEW FORMAT BRIEF OTOMATIS:</span>
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">
                      Tersalin!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Brief</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-black/60 rounded-xl p-3.5 text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre-line border border-white/5 max-h-36 overflow-y-auto select-all">
              {generatedMessage}
            </div>
          </div>

          {/* Security & Response Info */}
          <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono px-1">
            <span className="flex items-center gap-1 text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Brief dibuka di aplikasi email Anda</span>
            </span>
            <span>Jadwal sesuai kesepakatan</span>
          </div>

          <p role="status" aria-live="polite" className="text-xs text-zinc-400">
            {copyError
              ? "Belum dapat menyalin otomatis. Pilih teks preview dan salin manual."
              : isCopied
                ? "Brief tersalin."
                : "Tombol email membuka draf. Kirim pesan dari aplikasi email Anda."}
          </p>

          {/* Submit Actions */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              id="modal-email-submit-btn"
              href={mailtoUrl}
              onClick={() => onClose()}
              className="group flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-black/50 active:scale-95 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-red-600" />
              <span>Buka Draf Email</span>
              <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wide border border-white/15 transition-all cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">
                    Brief Berhasil Tersalin
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-400" />
                  <span>Salin Brief untuk Chat</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
