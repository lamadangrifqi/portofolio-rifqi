import React from "react";
import { usePageScroll } from "../hooks/usePageScroll";
import { PROFILE } from "../data/profileData";
import { ArrowUp, MapPin, Github, Linkedin, Instagram } from "lucide-react";
import { CoolThemeToggle } from "./lightswind/cool-theme-toggle";

export function Footer() {
  const navigate = usePageScroll();
  const scrollToTop = () => navigate("hero");

  return (
    <footer className="relative bg-black text-white border-t border-white/10 py-12 px-5 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Location */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <h4 className="text-sm font-bold tracking-wider uppercase text-white font-display">
              Rifqi Lamadang // Creative Tech
            </h4>
          </div>
          <p className="text-xs text-zinc-500 flex items-center justify-center md:justify-start gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-red-400" />
            <span>Palu, Sulawesi Tengah — Indonesia</span>
          </p>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-400">
          <a
            id="footer-github-link"
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Rifqi Lamadang"
            className="flex items-center gap-1.5 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
          >
            <Github className="w-3.5 h-3.5 text-white" />
            <span>GitHub</span>
          </a>

          <a
            id="footer-linkedin-link"
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Rifqi Lamadang"
            className="flex items-center gap-1.5 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
          >
            <Linkedin className="w-3.5 h-3.5 text-sky-400" />
            <span>LinkedIn</span>
          </a>

          <a
            id="footer-instagram-link"
            href={PROFILE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram Rifqi Lamadang"
            className="flex items-center gap-1.5 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400" />
            <span>Instagram</span>
          </a>

          <div
            className="flex items-center gap-2 pl-2 border-l border-white/10"
            title="Ubah Tema Portofolio"
          >
            <CoolThemeToggle size="sm" />
          </div>

          <button
            id="footer-scroll-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 cursor-pointer"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3 h-3 text-red-400" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-[11px] text-zinc-600">
        &copy; {new Date().getFullYear()} Rifqi Lamadang. All rights reserved.
        Code • Visuals • Design.
      </div>
    </footer>
  );
}
