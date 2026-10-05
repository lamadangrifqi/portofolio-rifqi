import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Sparkles,
  Award,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

import { CAREER_EVENTS } from "../data/profileData";

export function CareerJourneySection() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll linked progress for timeline glowing line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const lineScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section
      id="career"
      ref={containerRef}
      className="relative z-20 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-2 text-red-400 font-mono text-xs tracking-wider uppercase mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>PENGALAMAN // PEKERJAAN &amp; PENGEMBANGAN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Pengalaman &amp; Fokus Pekerjaan
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Pelayanan akademik, pengembangan sistem web, dan usaha visual yang
            saya jalankan.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-2 bg-zinc-900/90 border border-white/10 px-4 py-2 rounded-full text-xs font-mono text-zinc-300 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-red-400" />
          <span>AKADEMIK • WEB • VISUAL</span>
        </div>
      </div>

      {/* Vertical Interactive Timeline Container */}
      <div className="relative">
        {/* Background Track Line (Gray) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2" />

        {/* Animated Glowing Active Line (Scroll-linked) */}
        <motion.div
          style={{ scaleY: reduced ? 1 : lineScale, height: "100%" }}
          className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-red-600 via-red-500 to-amber-400 -translate-x-1/2 shadow-[0_0_12px_rgba(239,68,68,0.9)] z-10 origin-top"
        />

        {/* Timeline Items */}
        <div className="space-y-12 md:space-y-16">
          {CAREER_EVENTS.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={event.year}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row-reverse" : ""
                } gap-8 md:gap-0`}
              >
                {/* Center Node / Milestone Pin */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 z-20 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-zinc-950 border-2 border-red-500 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.6)] group-hover:scale-110 transition-transform">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
                  </div>
                </div>

                {/* Timeline Card */}
                <div
                  className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    isEven ? "md:pl-12" : "md:pr-12"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="rounded-3xl bg-zinc-950/85 border border-white/10 hover:border-red-500/40 p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all group relative overflow-hidden"
                  >
                    {/* Ambient corner glow */}
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

                    {/* Header: Year Badge & Location */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs font-bold shadow-sm">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{event.year}</span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
                        {event.location}
                      </span>
                    </div>

                    {/* Role Title & Organization */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-red-300 transition-colors font-display">
                      {event.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-zinc-300 mt-1 mb-4 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span>{event.company}</span>
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5">
                      {event.description}
                    </p>

                    {/* Impact Metric Badge if available */}
                    {event.impactMetric && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium text-amber-300 mb-5">
                        <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                        <span>{event.impactMetric}</span>
                      </div>
                    )}

                    {/* Key Highlights Checklist */}
                    <div className="space-y-2 pt-4 border-t border-white/10 mb-5">
                      {event.highlights.map((highlight, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start gap-2.5 text-xs text-zinc-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {event.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-zinc-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Empty side for layout balance on desktop */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
