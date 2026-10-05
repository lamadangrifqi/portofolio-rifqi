import React from "react";
import { WORKFLOW_STEPS } from "../data/servicesData";
import { Clock, CheckCircle2, ArrowRight } from "lucide-react";

export function WorkflowSection() {
  return (
    <div id="workflow-container" className="pt-16 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-xs font-mono font-semibold tracking-widest text-red-400 uppercase">
              // PRODUCTION WORKFLOW
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Alur Kerja Terstruktur &amp; Transparan
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
            Setiap proyek dikerjakan dengan tahapan terukur untuk memastikan
            efisiensi waktu, kualitas visual maksimal, dan kepuasan Anda.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-zinc-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <span>SOP: 4 FASE PRODUKSI</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {WORKFLOW_STEPS.map((item, idx) => (
          <div
            key={item.step}
            id={`workflow-step-${item.step}`}
            className="group relative flex flex-col justify-between rounded-2xl bg-zinc-950/80 border border-white/10 p-6 transition-all duration-300 hover:border-red-500/40 hover:bg-zinc-900/60"
          >
            <div>
              {/* Step indicator */}
              <div className="flex items-center justify-between gap-2 mb-5">
                <span className="text-2xl font-display font-black text-red-500/80 group-hover:text-red-400 transition-colors">
                  {item.step}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                  <Clock className="w-3 h-3 text-red-400" />
                  <span>{item.duration}</span>
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-red-200 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            {/* Checklist items */}
            <div className="pt-4 border-t border-white/10 space-y-2 mt-auto">
              <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                Fokus Output:
              </p>
              {item.deliverables.map((del, dIdx) => (
                <div
                  key={dIdx}
                  className="flex items-start gap-2 text-[11px] text-zinc-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{del}</span>
                </div>
              ))}
            </div>

            {/* Arrow on large screens for sequential look */}
            {idx < WORKFLOW_STEPS.length - 1 && (
              <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-black border border-white/20 text-zinc-400 pointer-events-none">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
