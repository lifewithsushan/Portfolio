import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiChevronDown, FiCode, FiCpu, FiDatabase, FiGithub, FiLinkedin } from "react-icons/fi";
import { FlipButton } from "@/components/ui/FlipButton";
import { useTypewriter } from "@/hooks/useTypewriter";
import { staggerContainer, staggerItem } from "@/hooks/useAnimateInView";

const headingWords = ["Sushan", "KC", "Khatri"];

const roles = [
  { label: "Full Stack", icon: FiCode },
  { label: "AI/ML", icon: FiCpu },
  { label: "Data", icon: FiDatabase },
];

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { ref: typeRef, displayed } = useTypewriter(
    "Building scalable full-stack applications that solve real business problems — from logistics dashboards to AI-powered platforms."
  );

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-dvh flex items-center px-6 sm:px-8 lg:px-12 overflow-hidden"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div
          className="h-[130%] w-full bg-cover bg-center"
          style={{ backgroundImage: "url(/photo.jpeg)" }}
        />
      </motion.div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[var(--bg)]/95 via-[var(--bg)]/80 to-[var(--bg)]/40" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--bg)] via-transparent to-[var(--bg)]/30" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[var(--primary)]/8 via-transparent to-transparent pointer-events-none" />
      <div
        className="pointer-events-none absolute inset-0 z-[2] transition-[background] duration-500"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(212,168,83,0.07), transparent 80%)`,
        }}
      />

      <div className="mx-auto w-full max-w-7xl pt-20 sm:pt-24 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={staggerItem} className="flex flex-wrap gap-2.5 mb-8">
              {roles.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--primary)]/15 bg-[var(--primary)]/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--primary)] backdrop-blur-sm"
                >
                  <Icon size={12} strokeWidth={1.5} />
                  {label}
                </span>
              ))}
              <a
                href="https://github.com/lifewithsushan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium text-white/50 hover:text-white hover:border-white/20 transition"
              >
                <FiGithub size={12} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sushan-kc-93948a2b8"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium text-white/50 hover:text-white hover:border-white/20 transition"
              >
                <FiLinkedin size={12} />
                LinkedIn
              </a>

            </motion.div>

            <motion.h1 variants={staggerItem} className="text-[clamp(2.5rem,10vw,8rem)] leading-[0.9] tracking-[-0.04em] font-bold">
              {headingWords.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 80, rotateX: -50 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  className="inline-block mr-[0.12em]"
                  style={{ perspective: "800px" }}
                >
                  {i === 2 ? <span className="text-[var(--primary)]">{word}</span> : word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              variants={staggerItem}
              ref={typeRef}
              className="mt-5 sm:mt-6 max-w-xl text-sm sm:text-base leading-7 sm:leading-8 text-white/45 min-h-[2.5rem] sm:min-h-[3rem]"
            >
              {displayed}
              <span className="inline-block w-[2px] h-[1em] bg-[var(--primary)] ml-0.5 animate-pulse align-middle" />
            </motion.div>

            <motion.div variants={staggerItem} className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
              <FlipButton
                href="#projects"
                front={
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm font-medium text-[var(--bg)]">
                    View Projects
                    <FiArrowRight size={14} />
                  </span>
                }
                back={
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm font-medium text-white">
                    See My Work
                  </span>
                }
              />
              <FlipButton
                href="#contact"
                front={
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm font-medium text-white/70">
                    Hire Me
                  </span>
                }
                back={
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 px-5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm font-medium text-[var(--primary)]">
                    Let&rsquo;s Talk
                  </span>
                }
              />
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="mt-10 sm:mt-14 flex items-center gap-2.5 text-[10px] sm:text-xs text-white/35"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--primary)]" />
              </span>
              Available for freelance &amp; collaboration
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/20"
        >
          <FiChevronDown size={14} />
        </motion.span>
      </motion.div>
    </section>
  );
}
