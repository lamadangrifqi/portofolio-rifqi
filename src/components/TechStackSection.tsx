import React from "react";
import { TECH_STACK } from "../data/servicesData";
import { Code2, Palette, Terminal, Sparkles } from "lucide-react";

export function TechStackSection() {
  const webTech = TECH_STACK.filter((t) => t.category === "Web Tech");
  const creativeSuite = TECH_STACK.filter(
    (t) => t.category === "Creative Suite",
  );

  return (
    <div id="tech-stack-container" className="pt-16 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase">
              // ARSENAL &amp; TOOLS
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Teknologi &amp; Creative Suite
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
            Teknologi untuk proyek web serta perangkat dan fokus kerja visual
            yang saya gunakan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            FULL-STACK + CREATIVE HYBRID
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Panel 1: Web Tech */}
        <div className="rounded-2xl bg-zinc-950/80 border border-white/10 p-6 sm:p-7">
          <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Full Stack Web Arsenal
                </h4>
                <p className="text-xs text-zinc-400">
                  Komponen, styling, API, dan interaksi
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/20">
              {webTech.length} Technologies
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {webTech.map((item, idx) => (
              <div
                key={idx}
                className="group p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-red-500/30 hover:bg-white/[0.06] transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Creative Suite */}
        <div className="rounded-2xl bg-zinc-950/80 border border-white/10 p-6 sm:p-7">
          <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Creative &amp; Media Suite
                </h4>
                <p className="text-xs text-zinc-400">
                  Fotografi dan komunikasi visual
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
              {creativeSuite.length} Creative Tools
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {creativeSuite.map((item, idx) => (
              <div
                key={idx}
                className="group p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
