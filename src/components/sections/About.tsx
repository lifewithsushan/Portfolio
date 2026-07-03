import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { FlipButton } from "@/components/ui/FlipButton";
import { journey } from "@/data/about";
import { skills } from "@/data/skills";
import { useProgressBar } from "@/hooks/useProgressBar";
import { useCountUp } from "@/hooks/useCountUp";
import { fadeUp } from "@/hooks/useTextReveal";
import { RevealWords } from "@/components/ui/RevealWords";

const process = [
  { step: "01", title: "Research & Strategy", label: "Understanding", pct: 30 },
  { step: "02", title: "Build & Execute", label: "Development", pct: 70 },
  { step: "03", title: "Test & Deliver", label: "QA & Launch", pct: 100 },
];

const topSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 6);

function StatItem({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { ref, display } = useCountUp({ end, duration: 2000, suffix });
  return (
    <div ref={ref} className="text-center">
      <span className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-[var(--primary)]">
        {display}
      </span>
      <p className="text-[11px] text-[var(--muted)] mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
}

function ProcessBar({ step, title, label, pct }: { step: string; title: string; label: string; pct: number }) {
  const { ref, filled } = useProgressBar();
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <span className="text-sm font-mono text-[var(--text)]/30">{step}</span>
          <div>
            <p className="text-[15px] font-medium">{title}</p>
            <p className="text-xs text-[var(--muted)] mt-0.5">{label}</p>
          </div>
        </div>
        <span className="text-sm text-[var(--text)]/30">{pct}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-bar-fill" style={{ width: filled ? `${pct}%` : "0%" }} />
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="px-6 sm:px-8 py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--primary)]/3 blur-[120px] pointer-events-none" />
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full max-w-[400px] mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[var(--primary)]/15 to-transparent blur-md" />
              <div className="absolute -inset-2 rounded-3xl border border-[var(--primary)]/10" />
              <motion.div
                className="relative rounded-3xl overflow-hidden border border-[var(--border)] aspect-[4/5]"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 to-transparent z-10" />
                <img
                  src="/photo.jpeg"
                  alt="Sushan KC Khatri"
                  className="h-full w-full object-cover"
                />
              </motion.div>

              {topSkills.map((skill, i) => {
                const positions = [
                  { top: "5%", right: "-10%" },
                  { top: "30%", right: "-15%" },
                  { top: "55%", right: "-10%" },
                  { bottom: "10%", left: "-10%" },
                  { bottom: "35%", left: "-15%" },
                  { bottom: "60%", left: "-10%" },
                ];
                return (
                  <motion.div
                    key={skill.name}
                    className="absolute z-20 rounded-xl border border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl px-3 py-2 shadow-xl"
                    style={positions[i] as React.CSSProperties}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.3, type: "spring" }}
                    whileHover={{ scale: 1.1, borderColor: "rgba(212,168,83,0.3)" }}
                  >
                    <span className="text-xs font-medium whitespace-nowrap">{skill.name}</span>
                    <span className="text-[11px] text-[var(--primary)] ml-1.5">{skill.level}%</span>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="mt-10 flex justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <FlipButton
                href="#contact"
                front={
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--text)]/70">
                    Work With Me
                    <FiArrowRight />
                  </span>
                }
                back={
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 px-6 py-3 text-sm font-medium text-[var(--primary)]">
                    Let&rsquo;s Talk
                  </span>
                }
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >

            <motion.h2
              className="text-[clamp(2rem,5.5vw,4rem)] mt-4 leading-tight relative inline-block"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.1 }}
            >
              Building digital <span className="text-[var(--primary)]">experiences</span>
              <br />
              that matter
              <motion.span
                className="absolute -bottom-2 left-0 h-px bg-[var(--primary)]/40"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </motion.h2>
            <motion.p
              className="mt-6 text-[15px] sm:text-base leading-8 text-[var(--text)]/45 max-w-lg"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.2 }}
            >
              <RevealWords
                text="I specialize in building scalable SaaS platforms, logistics systems, and AI-powered web applications using React, FastAPI, PostgreSQL, and Docker. I enjoy solving complex backend problems while creating intuitive user experiences. Every project is an opportunity to deliver real impact."
                delay={0.2}
              />
            </motion.p>

            <motion.div
              className="mt-12 grid grid-cols-3 gap-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.3 }}
            >
              <StatItem end={3} suffix="+" label="Years of Experience" />
              <StatItem end={17} suffix="" label="Technologies Mastered" />
              <StatItem end={15} suffix="+" label="Projects Delivered" />
            </motion.div>

            <motion.div
              className="mt-14"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.4 }}
            >
              <span className="section-number">Process</span>
              <div className="mt-5 space-y-8">
                {process.map((p) => (
                  <ProcessBar key={p.step} {...p} />
                ))}
              </div>
            </motion.div>

            <motion.div
              className="mt-14"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.4 }}
            >
              <span className="section-number">Journey</span>
              <div className="relative mt-6">
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[var(--border)]" />
                <div className="space-y-8">
                  {journey.map((j, i) => (
                    <motion.div
                      key={j.year}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12, duration: 0.5 }}
                      className="relative pl-9"
                    >
                      <motion.div
                        className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full border-2 border-[var(--primary)]/40 bg-[var(--bg)] flex items-center justify-center"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12 + 0.15, type: "spring" }}
                      >
                        <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                      </motion.div>
                      <span className="text-xs font-mono text-[var(--primary)]/60 font-medium">{j.year}</span>
                      <p className="text-[15px] font-medium mt-1">{j.title}</p>
                      <p className="text-sm text-[var(--muted)] mt-1.5 leading-6">{j.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
