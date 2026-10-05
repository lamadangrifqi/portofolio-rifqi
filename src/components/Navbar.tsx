import React, { useState, useEffect } from "react";
import { usePageScroll } from "../hooks/usePageScroll";
import { PROFILE } from "../data/profileData";
import {
  Sparkles,
  Github,
  Linkedin,
  Instagram,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CoolThemeToggle } from "./lightswind/cool-theme-toggle";

interface NavbarProps {
  onOpenHireModal: () => void;
}

export function Navbar({ onOpenHireModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrolled, setScrolled] = useState(false);

  const navigate = usePageScroll();
  useEffect(() => {
    const mapping: Record<string, string> = {
      hero: "hero",
      about: "about",
      karya: "karya",
      layanan: "layanan",
      stack: "stack",
      career: "stack",
      workflow: "stack",
      lab: "stack",
      kontak: "kontak",
    };
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]"),
    ).filter((el) => mapping[el.id]);
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 20);
      const current = sections
        .filter((el) => el.getBoundingClientRect().top <= 160)
        .at(-1);
      setActiveSection(current ? mapping[current.id] : "hero");
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);
  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    navigate(id);
  };

  // Streamlined 6 Core Menu Items (Focused, Non-crowded, Elegant)
  const navItems = [
    { id: "hero", label: "Beranda" },
    { id: "about", label: "Profil" },
    { id: "karya", label: "Karya" },
    { id: "stack", label: "Keahlian" },
    { id: "layanan", label: "Layanan" },
    { id: "kontak", label: "Kontak" },
  ];

  return (
    <>
      {/* Floating Capsule Header Container */}
      <header
        id="floating-navbar-header"
        className="fixed top-3.5 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none transition-all duration-300"
      >
        <div
          id="navbar-capsule"
          className={`pointer-events-auto w-full max-w-5xl rounded-full bg-zinc-950/85 backdrop-blur-2xl border transition-all duration-300 px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between shadow-2xl ${
            scrolled
              ? "border-white/20 shadow-black/90 bg-zinc-950/95"
              : "border-white/10 shadow-black/70"
          }`}
        >
          {/* Left: Brand Monogram & Name */}
          <button
            type="button"
            aria-label="Kembali ke beranda"
            id="nav-brand-btn"
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
          >
            {/* Monogram Gradient Badge */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-red-600 via-amber-500 to-red-400 p-[1px] shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center">
                <span className="font-extrabold text-xs sm:text-sm tracking-tighter bg-gradient-to-r from-red-400 via-amber-200 to-white bg-clip-text text-transparent font-display">
                  RL
                </span>
              </div>
            </div>

            {/* Name and Micro Badge */}
            <div className="flex flex-col text-left">
              <span className="font-extrabold tracking-tight text-white text-xs sm:text-sm leading-tight group-hover:text-red-400 transition-colors font-display">
                Rifqi Lamadang
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase">
                  Palu • Creative Tech
                </span>
              </div>
            </div>
          </button>

          {/* Center: Desktop Menu with Neon Active Indicator */}
          <nav
            id="desktop-nav"
            aria-label="Navigasi utama"
            className="hidden lg:flex items-center justify-center"
          >
            <ul className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 px-1.5 backdrop-blur-md">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="relative">
                    <button
                      type="button"
                      id={`desktop-nav-link-${item.id}`}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => scrollTo(item.id)}
                      className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? "text-white font-bold"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{item.label}</span>

                      {/* Floating Active Capsule Pill & Neon Glow Underline */}
                      {isActive && (
                        <motion.div
                          layoutId="active-pill-glow"
                          className="absolute inset-0 rounded-full bg-white/10 border border-white/20 -z-10 shadow-sm"
                          transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 35,
                          }}
                        >
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-[2px] bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,1)]" />
                        </motion.div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Quick Action & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <div className="flex items-center" title="Beralih Dark/Light Mode">
              <CoolThemeToggle size="sm" />
            </div>

            {/* Direct Hire CTA Button */}
            <button
              id="nav-hire-btn"
              type="button"
              onClick={onOpenHireModal}
              className="bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold px-3 sm:px-4 py-2 rounded-full transition-all duration-200 shadow-lg shadow-white/5 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-600 fill-red-600" />
              <span className="hidden min-[400px]:inline">Diskusi Proyek</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              className="lg:hidden bg-white/10 hover:bg-white/15 border border-white/10 text-white p-2 rounded-full shadow-md transition-transform active:scale-90 cursor-pointer flex items-center justify-center"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Slide Down Glass Sheet) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-20 z-40 bg-zinc-950/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 shadow-2xl shadow-black/95 lg:hidden flex flex-col gap-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                Navigasi Portofolio
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => scrollTo(item.id)}
                    className={`py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                      isActive
                        ? "bg-red-600/20 text-red-400 border border-red-500/30 font-bold"
                        : "bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Theme Toggle Row */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-300">
              <span className="font-medium">Mode Tampilan:</span>
              <div className="flex items-center gap-2">
                <CoolThemeToggle size="sm" />
              </div>
            </div>

            {/* Direct Social Shortcuts */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
              <span>Sosial &amp; Jejaring:</span>
              <div className="flex items-center gap-2">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 text-sky-400 hover:bg-white/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PROFILE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 text-pink-400 hover:bg-white/10 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
