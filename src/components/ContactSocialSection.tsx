import React from "react";
import { PROFILE } from "../data/profileData";
import {
  Instagram,
  Mail,
  ArrowUpRight,
  Sparkles,
  Send,
  MapPin,
  Clock,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { CyberpunkSocialLinks } from "./CyberpunkSocialLinks";
import { CONTACT_LOCATION, CONTACT_HOURS } from "../data/servicesData";

interface ContactSocialSectionProps {
  onOpenHireModal: () => void;
}

export function ContactSocialSection({
  onOpenHireModal,
}: ContactSocialSectionProps) {
  return (
    <section
      id="kontak"
      className="relative z-20 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hubungi &amp; Jejaring</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Mari Membangun Sesuatu yang Berbeda
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed max-w-xl mx-auto">
          Hubungi melalui saluran jejaring profesional resmi atau susun brief
          proyek terstruktur untuk konsultasi arsitektur website dan kolaborasi
          kreatif.
        </p>
      </div>

      {/* Cyberpunk Flagship Social Links: GitHub & LinkedIn */}
      <CyberpunkSocialLinks />

      {/* Verified Channels: Instagram Creative & Direct Project Dispatch */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Instagram Creative Channel Card */}
        <a
          id="contact-card-instagram"
          href={PROFILE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-pink-500/10 via-pink-500/5 to-transparent bg-zinc-950/80 backdrop-blur-xl border border-pink-500/30 hover:border-pink-500/70 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 shadow-xl flex flex-col justify-between overflow-hidden cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900/90 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Instagram className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-white flex items-center gap-1.5 font-mono">
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Visual &amp; Behind The Scenes
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border bg-pink-500/20 text-pink-300 border-pink-500/30">
                Visual Feed
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
              Konten visual dan proses kreatif yang dibagikan melalui profil
              Instagram.
            </p>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>@rifqilamadang</span>
            <span className="text-pink-300 font-semibold group-hover:underline flex items-center gap-1">
              Buka Profil Instagram →
            </span>
          </div>
        </a>

        {/* Direct Email Channel (No plain address exposed) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-zinc-950/80 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-mono">
                    Surat Elektronik
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Inquiry &amp; Kerjasama Resmi
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border bg-zinc-800/60 text-zinc-300 border-white/10">
                Direct Mail
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
              Kirimkan brief terperinci, dokumen proposal penawaran resmi, atau
              undangan kolaborasi langsung ke kotak masuk saya.
            </p>
          </div>

          <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
            <a
              id="contact-direct-mailto-btn"
              href={`mailto:${PROFILE.email}?subject=Inquiry%20Proyek%20Baru`}
              className="w-full text-center py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-red-400" />
              <span>Tulis Email →</span>
            </a>
            <div className="flex items-center justify-center gap-1 text-[11px] font-mono text-zinc-500">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Dibuka di aplikasi email Anda</span>
            </div>
          </div>
        </div>

        {/* Project Form Deck Trigger */}
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-red-950/25 via-zinc-950/90 to-zinc-950 backdrop-blur-xl border border-red-500/40 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                  <Send className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-mono">
                    Formulir Proyek
                  </h3>
                  <p className="text-xs text-red-300/80 font-mono">
                    Penyusunan Brief Terstruktur
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border bg-red-500/20 text-red-300 border-red-500/40 animate-pulse">
                Rekomendasi
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
              Pilih spesifikasi pilar layanan, target jadwal, serta rangkuman
              kebutuhan Anda untuk mendapatkan estimasi yang akurat.
            </p>
          </div>

          <div className="pt-3 border-t border-white/5">
            <button
              id="contact-open-project-form-btn"
              type="button"
              onClick={onOpenHireModal}
              className="w-full py-3.5 rounded-2xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold font-mono tracking-wide flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-black/50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-red-500" />
              <span>Susun Brief Proyek Sekarang</span>
            </button>
          </div>
        </div>
      </div>

      {/* Studio Operational Details Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-zinc-950/70 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PALU // DISKUSI & KOLABORASI</span>
            </div>
            <p className="text-sm font-semibold text-white">
              {CONTACT_LOCATION}
            </p>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              {CONTACT_HOURS} • Diskusi website dapat dilakukan secara online
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={onOpenHireModal}
            className="w-full md:w-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-semibold border border-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-red-400" />
            <span>Mulai Diskusi Kebutuhan</span>
          </button>
        </div>
      </div>
    </section>
  );
}
