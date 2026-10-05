import React from "react";
import { PROFILE } from "../data/profileData";
import {
  ArrowUpRight,
  Terminal,
  Cpu,
  ShieldCheck,
  GitBranch,
} from "lucide-react";

export function CyberpunkSocialLinks() {
  return (
    <div id="cyberpunk-social-links" className="w-full mb-10">
      {/* Cyberpunk Section Subheader */}
      <div className="flex items-center justify-between gap-4 mb-4 px-1">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
          <Terminal className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span className="text-zinc-300 font-semibold">
            NEURAL_NETWORK // SOCIAL_UPLINK
          </span>
          <span className="hidden sm:inline text-zinc-600">
            // [SOCIAL_LINKS: 2]
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-zinc-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SYS.ONLINE • DIRECT PROTOCOL</span>
        </div>
      </div>

      {/* Cyberpunk Cards Dual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* ================= GITHUB CYBERPUNK CARD ================= */}
        <a
          id="cyberpunk-link-github"
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          title="Kunjungi GitHub Rifqi Lamadang (Katalog Kode & Repositori)"
          className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-zinc-950/90 border border-white/15 hover:border-red-500/70 transition-all duration-300 overflow-hidden shadow-2xl hover:shadow-[0_0_35px_rgba(255,0,51,0.28)] hover:-translate-y-1 cursor-pointer"
        >
          {/* Cyberpunk Scanline Texture Layer */}
          <div className="cyber-scanlines absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity" />

          {/* Ambient Cyberpunk Red Radial Glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-red-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-red-600/30 group-hover:scale-125 transition-all duration-500" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-red-950/20 rounded-full blur-2xl pointer-events-none" />

          {/* Animated Cyber Laser Light Sweep on Hover */}
          <div className="cyber-laser-sweep cyber-laser-sweep-trigger opacity-0 group-hover:opacity-100" />

          {/* Cyberpunk HUD Corner Brackets */}
          <div className="absolute top-2.5 left-3 text-[10px] font-mono text-zinc-600 group-hover:text-red-400 transition-colors pointer-events-none select-none">
            ┌─ [NODE_01:GIT]
          </div>
          <div className="absolute top-2.5 right-3 text-[10px] font-mono text-zinc-600 group-hover:text-red-400 transition-colors pointer-events-none select-none">
            PORT:9418 ─┐
          </div>
          <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-zinc-600 group-hover:text-red-400 transition-colors pointer-events-none select-none">
            └─ [PUBLIC_PROFILE]
          </div>
          <div className="absolute bottom-2.5 right-3 text-[10px] font-mono text-zinc-600 group-hover:text-red-400 transition-colors pointer-events-none select-none">
            BRANCH:MAIN ─┘
          </div>

          {/* Card Top: Icon & High-Tech HUD Badges */}
          <div className="relative z-10 pt-2">
            <div className="flex items-start justify-between gap-4 mb-5">
              {/* High-Quality Cyberpunk GitHub Icon */}
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                {/* Outer Rotating HUD Reticle Ring */}
                <svg
                  className="absolute inset-0 w-full h-full cyber-reticle-spin text-red-500/30 group-hover:text-red-500/80 transition-colors duration-300"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="6 8"
                  />
                  {/* Cardinal Crosshair Ticks */}
                  <line
                    x1="50"
                    y1="0"
                    x2="50"
                    y2="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="50"
                    y1="92"
                    x2="50"
                    y2="100"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="0"
                    y1="50"
                    x2="8"
                    y2="50"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="92"
                    y1="50"
                    x2="100"
                    y2="50"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>

                {/* Inner Counter-Rotating Reticle Ring */}
                <svg
                  className="absolute inset-1.5 w-[calc(100%-12px)] h-[calc(100%-12px)] cyber-reticle-spin-rev text-zinc-600 group-hover:text-red-400/60 transition-colors duration-300"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="2 12"
                  />
                </svg>

                {/* Cyber Icon Core Plinth */}
                <div className="relative w-11 h-11 rounded-2xl bg-black/90 border border-white/20 group-hover:border-red-500 group-hover:bg-red-950/40 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,0,51,0.5)]">
                  {/* High-Fidelity GitHub Octocat SVG */}
                  <svg
                    className="w-6 h-6 text-white group-hover:text-red-100 transition-colors filter drop-shadow-[0_0_6px_rgba(255,0,51,0.4)]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  {/* Cyber Visor Optical Blip */}
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ff0033] animate-ping" />
                </div>
              </div>

              {/* Badges and Terminal Metadata */}
              <div className="flex flex-col items-end gap-1.5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-md bg-red-500/15 border border-red-500/40 text-red-300 shadow-[0_0_10px_rgba(255,0,51,0.15)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>SRC.ACTIVE // REPOS</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                  <GitBranch className="w-3 h-3 text-red-400" />
                  <span>v4.12 // OPEN_SOURCE</span>
                </span>
              </div>
            </div>

            {/* Title & Cyber Narrative */}
            <div>
              <div className="text-[11px] font-mono text-red-400/90 tracking-widest uppercase mb-1 flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-red-500" />
                <span className="group-hover:cyber-glitch-text">
                  GITHUB // SOURCE ENGINE
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white group-hover:text-red-100 transition-colors font-mono tracking-tight flex items-center gap-2 break-all sm:break-normal">
                <span>github.com/lamadangrifqi</span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono leading-relaxed mt-2 line-clamp-2">
                Eksplorasi kode sumber arsitektur web modern, eksperimen grafis
                ThreeUI WebGL, shader GLSL, serta open-source repositori.
              </p>
            </div>
          </div>

          {/* Card Bottom: Cyber Action Strip */}
          <div className="relative z-10 pt-5 mt-5 border-t border-white/10 group-hover:border-red-500/40 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 group-hover:text-zinc-200">
              <span className="text-red-500 font-bold">&gt;</span>
              <span className="text-[11px] text-zinc-500 group-hover:text-red-300 transition-colors">
                STATUS: REPOSITORI AKTIF
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 group-hover:bg-red-500 group-hover:text-black text-white text-xs font-mono font-bold transition-all duration-200 shadow-md group-hover:shadow-[0_0_16px_rgba(255,0,51,0.6)]">
              <span>[ JELAJAHI KODE ]</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </a>

        {/* ================= LINKEDIN CYBERPUNK CARD ================= */}
        <a
          id="cyberpunk-link-linkedin"
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          title="Kunjungi LinkedIn Rifqi Lamadang (Karier & Kolaborasi Profesional)"
          className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-zinc-950/90 border border-white/15 hover:border-cyan-400/70 transition-all duration-300 overflow-hidden shadow-2xl hover:shadow-[0_0_35px_rgba(0,240,255,0.28)] hover:-translate-y-1 cursor-pointer"
        >
          {/* Cyberpunk Scanline Texture Layer */}
          <div className="cyber-scanlines absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity" />

          {/* Ambient Cyberpunk Cyan Radial Glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/30 group-hover:scale-125 transition-all duration-500" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-sky-950/20 rounded-full blur-2xl pointer-events-none" />

          {/* Animated Cyber Laser Light Sweep on Hover */}
          <div className="cyber-laser-sweep cyber-laser-sweep-trigger opacity-0 group-hover:opacity-100" />

          {/* Cyberpunk HUD Corner Brackets */}
          <div className="absolute top-2.5 left-3 text-[10px] font-mono text-zinc-600 group-hover:text-cyan-400 transition-colors pointer-events-none select-none">
            ┌─ [NODE_02:NET]
          </div>
          <div className="absolute top-2.5 right-3 text-[10px] font-mono text-zinc-600 group-hover:text-cyan-400 transition-colors pointer-events-none select-none">
            AUTH:OK ─┐
          </div>
          <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-zinc-600 group-hover:text-cyan-400 transition-colors pointer-events-none select-none">
            └─ [PROFESSIONAL]
          </div>
          <div className="absolute bottom-2.5 right-3 text-[10px] font-mono text-zinc-600 group-hover:text-cyan-400 transition-colors pointer-events-none select-none">
            ZONE:GLOBAL ─┘
          </div>

          {/* Card Top: Icon & High-Tech HUD Badges */}
          <div className="relative z-10 pt-2">
            <div className="flex items-start justify-between gap-4 mb-5">
              {/* High-Quality Cyberpunk LinkedIn Icon */}
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                {/* Outer Rotating HUD Reticle Ring (Cyan) */}
                <svg
                  className="absolute inset-0 w-full h-full cyber-reticle-spin text-cyan-400/30 group-hover:text-cyan-400/80 transition-colors duration-300"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="8 6"
                  />
                  {/* Cardinal Crosshair Ticks */}
                  <line
                    x1="50"
                    y1="0"
                    x2="50"
                    y2="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="50"
                    y1="92"
                    x2="50"
                    y2="100"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="0"
                    y1="50"
                    x2="8"
                    y2="50"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="92"
                    y1="50"
                    x2="100"
                    y2="50"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>

                {/* Inner Counter-Rotating Segmented Ring */}
                <svg
                  className="absolute inset-1.5 w-[calc(100%-12px)] h-[calc(100%-12px)] cyber-reticle-spin-rev text-zinc-600 group-hover:text-cyan-300/60 transition-colors duration-300"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                  />
                </svg>

                {/* Cyber Icon Core Plinth */}
                <div className="relative w-11 h-11 rounded-2xl bg-black/90 border border-white/20 group-hover:border-cyan-400 group-hover:bg-cyan-950/40 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                  {/* High-Fidelity LinkedIn Mark SVG */}
                  <svg
                    className="w-5 h-5 text-white group-hover:text-cyan-200 transition-colors filter drop-shadow-[0_0_6px_rgba(0,240,255,0.5)]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.32a1.62 1.62 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.62-1.63-1.62z" />
                  </svg>
                  {/* Cyber Pulse Radar Node */}
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-ping" />
                </div>
              </div>

              {/* Badges and Terminal Metadata */}
              <div className="flex flex-col items-end gap-1.5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-md bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.15)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>PRO.NETWORK // CONNECT</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" />
                  <span>CONTACT // COLAB_OPEN</span>
                </span>
              </div>
            </div>

            {/* Title & Cyber Narrative */}
            <div>
              <div className="text-[11px] font-mono text-cyan-400/90 tracking-widest uppercase mb-1 flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-cyan-400" />
                <span className="group-hover:cyber-glitch-text">
                  LINKEDIN // NEURAL PRO NETWORK
                </span>
              </div>
              <h3 className="text-base sm:text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors font-mono tracking-tight flex items-center gap-2 break-all sm:break-normal">
                <span>linkedin.com/in/rifqilamadang</span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono leading-relaxed mt-2 line-clamp-2">
                Profil profesional dan jalur untuk berdiskusi tentang pekerjaan
                atau kolaborasi.
              </p>
            </div>
          </div>

          {/* Card Bottom: Cyber Action Strip */}
          <div className="relative z-10 pt-5 mt-5 border-t border-white/10 group-hover:border-cyan-400/40 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 group-hover:text-zinc-200">
              <span className="text-cyan-400 font-bold">&gt;</span>
              <span className="text-[11px] text-zinc-500 group-hover:text-cyan-300 transition-colors">
                STATUS: TERBUKA UNTUK MITRA
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 group-hover:bg-cyan-400 group-hover:text-black text-white text-xs font-mono font-bold transition-all duration-200 shadow-md group-hover:shadow-[0_0_16px_rgba(0,240,255,0.6)]">
              <span>[ HUBUNGKAN JARINGAN ]</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
