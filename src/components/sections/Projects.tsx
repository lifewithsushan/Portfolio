import { motion } from "framer-motion";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { projects } from "@/data/projects";
import { FlipButton } from "@/components/ui/FlipButton";
import { TiltCard } from "@/components/ui/TiltCard";
import { staggerContainer, staggerItem } from "@/hooks/useAnimateInView";
import { fadeUp } from "@/hooks/useTextReveal";

export function Projects() {
  return (
    <section id="projects" className="px-6 sm:px-8 py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/[0.015] blur-[120px] pointer-events-none" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] mt-4 leading-tight max-w-xl relative inline-block">
            Featured <span className="text-[var(--primary)]">projects</span>
            <motion.span
              className="absolute -bottom-2 left-0 h-px bg-[var(--primary)]/40"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </h2>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-10 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={staggerItem}
            >
              <TiltCard intensity={4} className="card-hover group relative">
              <div className="aspect-[16/10] rounded-2xl border border-white/[0.06] bg-white/[0.02] flex items-end p-5 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex flex-wrap gap-2 relative z-10">
                  {project.tech.map((t) => (
                    <span key={t} className="inline-flex rounded-full border border-white/[0.06] bg-black/60 backdrop-blur-sm px-3 py-1 text-[11px] font-medium text-white/70">{t}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-3 text-xs text-white/30 mb-2">
                  <span className="text-[13px] font-mono text-white/20">00{index + 1}</span>
                  <FiExternalLink size={12} />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-[var(--primary)] transition-colors duration-300">{project.title}</h3>
                <p className="mt-2.5 text-[15px] leading-7 text-white/45 line-clamp-2">
                  {project.description}
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <FlipButton
                    href="#contact"
                    front={
                      <span className="inline-flex items-center gap-2 text-sm text-white/50 group-hover:text-white transition">
                        View Details
                        <FiArrowRight size={14} />
                      </span>
                    }
                    back={
                      <span className="inline-flex items-center gap-2 text-sm text-[var(--primary)]">
                        See Code
                        <FiArrowRight size={14} />
                      </span>
                    }
                  />
                </div>
              </div>
            </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
