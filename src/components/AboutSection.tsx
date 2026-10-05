import React from "react";
import {
  User,
  Sparkles,
  MapPin,
  CheckCircle2,
  Code,
  Camera,
  Layers,
  Compass,
} from "lucide-react";
import { HangingIdCard } from "@/components/lightswind/hanging-id-card";
import { PROFILE } from "../data/profileData";
import latestUserPhoto from "../assets/images/user_photo_latest.jpg";

interface AboutSectionProps {
  onOpenHireModal?: (serviceId?: string) => void;
}

export function AboutSection({ onOpenHireModal }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-red-400 font-mono text-xs tracking-wider uppercase mb-2">
            <User className="w-3.5 h-3.5" />
            <span>TENTANG SAYA // CREATIVE TECH PROFILE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
            Di Persimpangan Kode &amp; Visual
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Membangun sistem yang memudahkan pekerjaan dan visual yang
            menyampaikan informasi dengan jelas.
          </p>
        </div>

        {/* Location & Status Badge */}
        <div className="flex items-center gap-3 bg-zinc-900/90 border border-white/10 px-4 py-2.5 rounded-2xl shrink-0 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-white text-xs font-bold">
              <MapPin className="w-3 h-3 text-red-400" />
              <span>Palu, Sulawesi Tengah</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 mt-0.5">
              Tersedia untuk Remote &amp; On-Site Proyek
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Narrative & Interactive Lanyard Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
        {/* Left Column: Personal Narrative Card */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-zinc-950/80 border border-white/10 p-7 sm:p-9 relative overflow-hidden backdrop-blur-md shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
              <Compass className="w-3.5 h-3.5" />
              <span>PHILOSOPHY &amp; APPROACH</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug font-display">
              Sistem yang membantu pekerjaan. Visual yang menghidupkan cerita.
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Saya{" "}
              <strong className="text-white">
                Moh. Rifqi S. Lamadang, A.Md.Kom.
              </strong>
              , berbasis di Palu. Saya bekerja sebagai operator dan admin
              akademik di Fakultas Hukum Universitas Tadulako, sekaligus
              mengembangkan website, sistem operasional, fotografi, dan desain
              digital.
            </p>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Kebutuhan sehari-hari menjadi titik awal saya: menyederhanakan
              alur layanan, membuat informasi lebih mudah dipahami, dan
              menyiapkan pengalaman digital yang nyaman. Red Rush Digital
              berfokus pada website; Galeri Ku Palu merupakan usaha fotografi
              yang terpisah.
            </p>
          </div>

          {/* Core Strengths Checklist */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/10 mt-6">
            <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
              <span>Alur Web yang Mudah Digunakan</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
              <span>Fotografi Wisuda di Lokasi</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
              <span>Materi Informasi Digital</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
              <span>Lingkup Kerja yang Disepakati</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dedicated Tactile Lanyard ID Card Showcase Stage */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-zinc-950/80 border border-white/10 p-6 sm:p-7 relative overflow-visible backdrop-blur-md shadow-2xl">
          {/* Top Label */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIGITAL ID CARD // PERSONAL PROFILE</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
              PENDULUM PHYSICS
            </span>
          </div>

          {/* Interactive Lanyard Component Area */}
          <div className="py-2 flex items-center justify-center w-full min-h-[580px] overflow-visible">
            <HangingIdCard
              name={PROFILE.name}
              avatarUrl={latestUserPhoto}
              photoUrl={latestUserPhoto}
              role={PROFILE.role}
              subRole="Code • Visuals • Design"
              degree={PROFILE.degree}
              statusText="Available for Projects"
              organization="Web • Photography • Design"
              location="Palu, Sulawesi Tengah"
              badgeId="RIFQI // CREATIVE-TECH // 2026"
              accentColor="#ef4444"
              ropeLength={115}
              ropeColor="#18181b"
            />
          </div>
        </div>
      </div>

      {/* 3 Pillars of Expertise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Pilar 01 */}
        <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-red-500/30 transition-all backdrop-blur-md group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:scale-110 transition-transform">
                <Code className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  Full-Stack &amp; Web App
                </h4>
                <span className="text-[11px] text-zinc-400">
                  React, TypeScript, Tailwind
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30">
              Pilar 01
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Membangun sistem web performa tinggi, dashboard bisnis, dan landing
            page interaktif dengan arsitektur bersih serta responsif.
          </p>
        </div>

        {/* Pilar 02 */}
        <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-amber-500/30 transition-all backdrop-blur-md group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  Fotografi &amp; Visual
                </h4>
                <span className="text-[11px] text-zinc-400">
                  Canon 70D • EF 50mm f/1.8
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              Pilar 02
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Fotografi wisuda dan portrait melalui Galeri Ku Palu, dengan lokasi
            serta jadwal yang disepakati.
          </p>
        </div>

        {/* Pilar 03 */}
        <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-purple-500/30 transition-all backdrop-blur-md group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  Desain &amp; Identitas
                </h4>
                <span className="text-[11px] text-zinc-400">
                  Poster, Banner, Media Sosial
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
              Pilar 03
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Menyusun poster, pengumuman, dan materi promosi digital yang rapi
            dan mudah dibaca.
          </p>
        </div>
      </div>
    </section>
  );
}
