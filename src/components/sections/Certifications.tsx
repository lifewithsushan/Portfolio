import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { achievements, certifications } from "@/data/certifications";
import { FlipButton } from "@/components/ui/FlipButton";
import { TiltCard } from "@/components/ui/TiltCard";
import { staggerContainer, staggerItem } from "@/hooks/useAnimateInView";
import { fadeUp } from "@/hooks/useTextReveal";

export function Certifications() {
  return (
    <section id="certifications" className="px-6 sm:px-8 py-28 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] rounded-full bg-[var(--primary)]/2 blur-[100px] pointer-events-none" />
      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-[clamp(2rem,5.5vw,4rem)] mt-4 leading-tight relative inline-block">
            Certifications &amp; <span className="text-[var(--primary)]">recognition</span>
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
          className="mt-14 grid gap-4 sm:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <motion.div key={cert.title} variants={staggerItem}>
                <TiltCard intensity={3} className="card-hover rounded-2xl border border-white/[0.06] p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] text-white/50">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-[15px] font-medium">{cert.title}</p>
                      <p className="text-xs text-white/40 mt-0.5">{cert.issuer}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-8 grid gap-4 sm:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {achievements.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={staggerItem}>
                <TiltCard intensity={3} className="card-hover rounded-2xl border border-white/[0.06] p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-[15px] font-medium">{item.title}</p>
                      <p className="text-xs text-white/40 mt-0.5">{item.text.slice(0, 60)}...</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 flex"
        >
          <FlipButton
            href="#contact"
            front={
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[var(--bg)]">
                <FiAward />
                Hire Me
              </span>
            }
            back={
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white">
                <FiAward />
                Let&rsquo;s Connect
              </span>
            }
          />
        </motion.div>
      </div>
    </section>
  );
}
