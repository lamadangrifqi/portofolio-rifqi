import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  useInView,
} from "motion/react";
import { ArrowDown } from "lucide-react";
import { usePageScroll } from "../hooks/usePageScroll";
import { useHeroEffects } from "../hooks/useHeroEffects";
import { useDecorativeMotion } from "../hooks/useDecorativeMotion";
const VortexBackground = React.lazy(() =>
  import("./VortexBackground").then((module) => ({
    default: module.VortexBackground,
  })),
);
const BG_IMAGE_1 = "/hero-1.jpg";
const BG_IMAGE_2 = "/hero-2.jpg";

interface ArcData {
  r: number;
  startDeg: number;
  endDeg: number;
  dotDeg: number;
  val: string;
  suffix?: string;
  label: string;
}

const ARC_CONFIGS: ArcData[] = [
  {
    r: 330,
    startDeg: -92,
    endDeg: 16,
    dotDeg: -46,
    val: "WEB",
    label: "SISTEM & WEBSITE",
  },
  {
    r: 395,
    startDeg: -56,
    endDeg: 60,
    dotDeg: 2,
    val: "FOTO",
    label: "MOMEN & PORTRAIT",
  },
  {
    r: 460,
    startDeg: -14,
    endDeg: 72,
    dotDeg: 44,
    val: "DESAIN",
    label: "MATERI DIGITAL",
  },
];

const CENTER_X = -110;
const CENTER_Y = 300;

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function polarToCartesian(cx: number, cy: number, r: number, deg: number) {
  const rad = degToRad(deg);
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

export function HeroSection({
  onOpenHireModal,
}: {
  onOpenHireModal: () => void;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const gridPatternRef = useRef<SVGPatternElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const decorative = useDecorativeMotion();
  const reduced = useReducedMotion();
  const heroVisible = useInView(heroRef);
  const scrollTo = usePageScroll();
  useHeroEffects(
    decorative,
    heroRef,
    revealRef,
    gridPatternRef,
    particleCanvasRef,
  );
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const textY = useTransform(smoothProgress, [0, 1], [0, reduced ? 0 : 80]);
  const visualY = useTransform(smoothProgress, [0, 1], [0, reduced ? 0 : 130]);
  const heroOpacity = useTransform(
    smoothProgress,
    [0, 0.8],
    [1, reduced ? 1 : 0],
  );
  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-[100dvh] w-full overflow-hidden select-none bg-black"
    >
      {/* ThreeUI Typography Vortex Background Layer */}
      {decorative && heroVisible && (
        <React.Suspense fallback={null}>
          <VortexBackground />
        </React.Suspense>
      )}
      {/* Layer 0: Grid background SVG with parallax */}
      <svg
        id="parallax-grid-svg"
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            ref={gridPatternRef}
            id="hero-grid-pattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
            x="0"
            y="0"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="#64748b"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
      </svg>

      {/* Layer 10: Base image (red-tinted portrait) with Ken Burns intro & optimal framing */}
      <div
        id="hero-base-image"
        className="absolute inset-0 z-10 bg-center bg-cover md:bg-contain lg:bg-cover bg-no-repeat ken-burns-intro"
        style={{
          backgroundImage: `url(${BG_IMAGE_1})`,
          backgroundPosition: "center 20%",
        }}
      />

      {/* Layer 20: Subtle cyberpunk particle trail canvas (behind spotlight) */}
      {decorative && (
        <canvas
          id="hero-particles-canvas"
          ref={particleCanvasRef}
          className="absolute inset-0 z-20 pointer-events-none w-full h-full"
        />
      )}

      {/* Layer 30: Cursor spotlight reveal layer (alternate image) */}
      <div
        id="hero-reveal-image"
        ref={revealRef}
        className="absolute inset-0 z-30 bg-center bg-cover md:bg-contain lg:bg-cover bg-no-repeat pointer-events-none hero-reveal-mask"
        style={{
          backgroundImage: `url(${BG_IMAGE_2})`,
          backgroundPosition: "center 20%",
          maskImage:
            "radial-gradient(circle 260px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 0%, black 40%, rgba(0,0,0,.75) 60%, rgba(0,0,0,.4) 75%, rgba(0,0,0,.12) 88%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle 260px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 0%, black 40%, rgba(0,0,0,.75) 60%, rgba(0,0,0,.4) 75%, rgba(0,0,0,.12) 88%, transparent 100%)",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />

      {/* Subtle Vignette & bottom gradient overlay to guarantee text legibility */}
      <div
        id="hero-lighting-overlay"
        className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-t from-black/85 via-black/20 to-black/30"
      />

      {/* Layer 50: Stats pada fading circular arc (hidden below sm) with subtle parallax */}
      <motion.div
        id="hero-stats-arcs"
        style={{ y: visualY }}
        className="absolute top-24 bottom-12 right-3 sm:right-6 pointer-events-none z-50 hidden lg:block w-auto"
      >
        <svg
          id="stats-arcs-svg"
          viewBox="0 0 440 700"
          preserveAspectRatio="xMaxYMid meet"
          className="h-full w-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {ARC_CONFIGS.map((arc, i) => {
              const startPt = polarToCartesian(
                CENTER_X,
                CENTER_Y,
                arc.r,
                arc.startDeg,
              );
              const endPt = polarToCartesian(
                CENTER_X,
                CENTER_Y,
                arc.r,
                arc.endDeg,
              );
              return (
                <linearGradient
                  key={`grad-${i}`}
                  id={`arc-gradient-${i}`}
                  gradientUnits="userSpaceOnUse"
                  x1={startPt.x}
                  y1={startPt.y}
                  x2={endPt.x}
                  y2={endPt.y}
                >
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="22%" stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="55%" stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="85%" stopColor="#ffffff" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              );
            })}
          </defs>

          {ARC_CONFIGS.map((arc, i) => {
            const startPt = polarToCartesian(
              CENTER_X,
              CENTER_Y,
              arc.r,
              arc.startDeg,
            );
            const endPt = polarToCartesian(
              CENTER_X,
              CENTER_Y,
              arc.r,
              arc.endDeg,
            );
            const dotPt = polarToCartesian(
              CENTER_X,
              CENTER_Y,
              arc.r,
              arc.dotDeg,
            );

            const deltaAngleDeg = arc.endDeg - arc.startDeg;
            const deltaAngleRad = degToRad(deltaAngleDeg);
            const arcLength = arc.r * deltaAngleRad;

            const lineDelay = 0.4 + i * 0.22;
            const markDelay = lineDelay + 0.9;

            const pathD = `M ${startPt.x.toFixed(2)} ${startPt.y.toFixed(2)} A ${arc.r} ${arc.r} 0 0 1 ${endPt.x.toFixed(2)} ${endPt.y.toFixed(2)}`;

            return (
              <g key={`arc-group-${i}`} id={`arc-group-${i}`}>
                {/* Fading circular arc stroke */}
                <path
                  id={`arc-path-${i}`}
                  d={pathD}
                  fill="none"
                  stroke={`url(#arc-gradient-${i})`}
                  strokeWidth="1.1"
                  className="arc-line"
                  style={
                    {
                      "--len": `${arcLength.toFixed(1)}px`,
                      animationDelay: `${lineDelay.toFixed(2)}s`,
                    } as React.CSSProperties
                  }
                />

                {/* Pulsing ring around the dot */}
                <circle
                  id={`arc-ring-${i}`}
                  cx={dotPt.x.toFixed(2)}
                  cy={dotPt.y.toFixed(2)}
                  r="7"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1"
                  className="arc-ring"
                  style={{
                    animationDelay: `${(markDelay + 0.3).toFixed(2)}s`,
                  }}
                />

                {/* Filled white center dot */}
                <circle
                  id={`arc-dot-${i}`}
                  cx={dotPt.x.toFixed(2)}
                  cy={dotPt.y.toFixed(2)}
                  r="3.4"
                  fill="#ffffff"
                  className="arc-dot"
                  style={{
                    animationDelay: `${markDelay.toFixed(2)}s`,
                  }}
                />

                {/* Number Stat */}
                <text
                  id={`arc-val-${i}`}
                  x={Math.min(dotPt.x + 16, 225).toFixed(2)}
                  y={(dotPt.y + 4).toFixed(2)}
                  fill="#ffffff"
                  fontSize={arc.val.length > 4 ? "24" : "32"}
                  fontWeight="700"
                  letterSpacing="-1px"
                  className="arc-text"
                  style={{
                    animationDelay: `${(markDelay + 0.15).toFixed(2)}s`,
                  }}
                >
                  {arc.val}
                  {arc.suffix && (
                    <tspan fontSize="19" dy="-10" letterSpacing="-1px">
                      {arc.suffix}
                    </tspan>
                  )}
                </text>

                {/* Stat Label Uppercase */}
                <text
                  id={`arc-label-${i}`}
                  x={(dotPt.x + 18).toFixed(2)}
                  y={(dotPt.y + 22).toFixed(2)}
                  fill="#ffffff"
                  fillOpacity="0.8"
                  fontSize="8.5"
                  fontWeight="600"
                  letterSpacing="2px"
                  className="arc-text"
                  style={{
                    animationDelay: `${(markDelay + 0.3).toFixed(2)}s`,
                  }}
                >
                  {arc.label}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Layer 50: Hero text block with subtle scroll parallax */}
      <motion.div
        id="hero-content"
        style={{ y: textY, opacity: heroOpacity }}
        className="absolute bottom-10 sm:bottom-14 md:bottom-20 left-5 sm:left-8 md:left-12 max-w-[320px] sm:max-w-md md:max-w-lg z-50 pointer-events-auto"
      >
        {/* Identity Pill Card inspired by reference */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-zinc-300 hero-rise mb-3 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-white">
            Available for Projects
          </span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="font-mono text-[11px] text-zinc-400 hidden sm:inline">
            Palu, Sulawesi Tengah
          </span>
        </div>

        {/* Eyebrow */}
        <p
          id="hero-eyebrow"
          className="text-[11px] sm:text-xs font-semibold tracking-[0.12em] text-white/80 hero-rise hero-rise-eyebrow mb-2 sm:mb-2.5"
        >
          PORTFOLIO //{" "}
          <span className="text-red-400 italic">CREATIVE TECH</span>
        </p>

        {/* H1 Heading */}
        <h1
          id="hero-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight text-white hero-rise hero-rise-h1 mb-2.5 sm:mb-3 drop-shadow-md font-display"
        >
          Rifqi Lamadang
        </h1>

        {/* Tagline */}
        <p
          id="hero-tagline"
          className="text-sm sm:text-base md:text-lg font-semibold tracking-wide text-red-400 hero-rise hero-rise-tagline mb-3 sm:mb-4 drop-shadow-sm font-display"
        >
          Code • Visuals • Design
        </p>

        {/* Paragraph Description */}
        <p
          id="hero-description"
          className="text-xs sm:text-sm md:text-[15px] text-white/85 leading-relaxed hero-rise hero-rise-p mb-6 sm:mb-7 max-w-sm sm:max-w-md drop-shadow-sm font-normal"
        >
          Saya membangun sistem web yang menyederhanakan pekerjaan, serta
          mengembangkan fotografi dan desain digital dari Palu.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            id="hero-cta-btn"
            type="button"
            onClick={() => onOpenHireModal()}
            className="hero-rise hero-rise-btn group relative inline-flex items-center justify-center px-7 sm:px-8 py-3.5 rounded-full bg-white text-gray-900 font-semibold text-xs sm:text-sm tracking-wide shadow-lg shadow-black/30 overflow-hidden transition-transform duration-200 hover:scale-[1.04] active:scale-95 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Hubungi Saya</span>
              <span className="text-red-500 font-bold">→</span>
            </span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
          </button>

          <a
            id="hero-social-btn"
            href="#kontak"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("kontak");
            }}
            className="hero-rise hero-rise-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm tracking-wide border border-white/20 transition-all duration-200 cursor-pointer shadow-lg shadow-black/20"
          >
            <span>Jejaring &amp; Kontak</span>
            <span className="text-red-400">↓</span>
          </a>
        </div>
      </motion.div>

      {/* Floating Scroll Indicator on Bottom Right */}
      <button
        type="button"
        onClick={() => {
          scrollTo("about");
        }}
        aria-label="Scroll to About section"
        className="absolute bottom-6 right-5 sm:right-8 md:right-12 z-30 hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg hover:border-white/30"
      >
        <span>EKSPLORASI PROFIL</span>
        <ArrowDown className="w-3.5 h-3.5 text-red-400 animate-bounce" />
      </button>
    </section>
  );
}
