import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { experiences } from "@/data/experience";
import { FlipButton } from "@/components/ui/FlipButton";
import { TiltCard } from "@/components/ui/TiltCard";
import { staggerContainer, staggerItem } from "@/hooks/useAnimateInView";
import { fadeUp } from "@/hooks/useTextReveal";

export function Experience() {
  return (
    <section id="experience" className="px-6 sm:px-8 py-28 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 w-[450px] h-[450px] rounded-full bg-[var(--primary)]/2 blur-[100px] pointer-events-none" />
      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-[clamp(2rem,5.5vw,4rem)] mt-4 leading-tight relative inline-block">
            Where I&rsquo;ve <span className="text-[var(--primary)]">worked</span>
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
          className="mt-14 grid gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {experiences.map((item) => (
            <motion.div key={item.title} variants={staggerItem}>
              <TiltCard intensity={4} className="card-hover rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-[var(--primary)]/60">{item.period}</span>
                    <h3 className="mt-2 text-[17px] font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-white/40">{item.company}</p>
                  </div>
                </div>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-sm text-white/50 leading-6">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]/60 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 flex"
        >
          <FlipButton
            href="/Sushan-KC-Khatri-Resume.txt"
            download
            front={
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/70">
                <FiDownload />
                Resume
              </span>
            }
            back={
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 px-6 py-3 text-sm font-medium text-[var(--primary)]">
                <FiDownload />
                Download CV
              </span>
            }
          />
        </motion.div>
      </div>
    </section>
  );
}
