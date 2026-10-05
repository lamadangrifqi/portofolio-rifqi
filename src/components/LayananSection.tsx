import { Code, Camera, Layers, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { PILLAR_SERVICES } from "../data/servicesData";
export function LayananSection({
  onOpenHireModal,
}: {
  onOpenHireModal: (id?: string) => void;
}) {
  const reduced = useReducedMotion();
  const icons = [Code, Camera, Layers];
  return (
    <section
      id="layanan"
      className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      <div className="border-b border-white/10 pb-6 mb-8">
        <p className="text-red-400 font-mono text-xs tracking-wider uppercase mb-2">
          LAYANAN // WEB • FOTO • DESAIN
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Apa yang Bisa Saya Bantu?
        </h2>
        <p className="text-sm text-zinc-400 mt-3 max-w-2xl">
          Mulai dari kebutuhan Anda. Lingkup, jadwal, dan biaya dibahas sebelum
          pengerjaan dimulai.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {PILLAR_SERVICES.map((service, i) => {
          const Icon = icons[i];
          return (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: reduced ? 0.1 : 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-red-500/30 p-6 sm:p-7 flex flex-col gap-5"
            >
              <div className="flex items-center justify-between">
                <Icon className="w-6 h-6 text-red-400" />
                <span className="text-zinc-500 font-mono text-xs">
                  {service.pillarNumber}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {service.title}
                </h3>
                <p className="text-xs text-red-400 mt-2">{service.tagline}</p>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {service.description}
              </p>
              <div className="space-y-3 flex-1">
                {service.subServices.map((sub) => (
                  <div key={sub.name} className="p-3 rounded-xl bg-white/5">
                    <h4 className="text-sm font-semibold text-white">
                      {sub.name}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      {sub.description}
                    </p>
                  </div>
                ))}
              </div>
              <ul className="space-y-2 text-xs text-zinc-300">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onOpenHireModal(service.id)}
                className="flex items-center justify-between rounded-xl px-4 py-3 bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-200"
              >
                Diskusikan Kebutuhan
                <ArrowUpRight className="w-4 h-4 text-red-600" />
              </button>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
