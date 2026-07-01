import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { staggerContainer, staggerItem } from "@/hooks/useAnimateInView";
import { Marquee } from "@/components/ui/Marquee";

const categories = [...new Set(skills.map((s) => s.category))];

const marqueeItems = skills.map((s) => ({
  name: s.name,
  icon: <s.icon size={16} />,
  color: s.color,
}));

function SkillBadge({ skill, index }: { skill: typeof skills[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = skill.icon;
  const delay = index * 0.25;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
    >
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative inline-flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5 cursor-default overflow-hidden"
        style={{
          animation: hovered ? "none" : `badge-tilt 4s ease-in-out ${delay}s infinite`,
        }}
        whileHover={{ scale: 1.08, y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 12 }}
      >
        <span
          className="relative inline-flex"
          style={{
            color: skill.color,
            animation: hovered ? "none" : `icon-breathe 2.5s ease-in-out ${delay}s infinite`,
          }}
        >
          <motion.span
            className="inline-flex"
            animate={hovered ? { scale: 1.3, rotate: [0, -10, 10, -5, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Icon size={16} />
          </motion.span>
        </span>
        <span className="text-[13px] font-medium text-white/70 transition-colors duration-300"
          style={{ color: hovered ? "#fff" : "rgba(255,255,255,0.7)" }}
        >
          {skill.name}
        </span>
        <span
          className="text-[11px] px-1.5 py-0.5 rounded-md font-mono"
          style={{ backgroundColor: `${skill.color}18`, color: skill.color }}
        >
          {skill.level}%
        </span>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="px-6 sm:px-8 py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[var(--primary)]/2 blur-[100px] pointer-events-none" />
      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[clamp(2rem,5.5vw,4rem)] mt-4 leading-tight max-w-xl">
            Tools &amp; technologies I <span className="text-[var(--primary)]">work with</span>
          </h2>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat}
              variants={staggerItem}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-white/30 mb-6">{cat}</p>
              <div className="flex flex-wrap gap-2.5">
                {skills
                  .filter((s) => s.category === cat)
                  .map((skill, i) => (
                    <SkillBadge key={skill.name} skill={skill} index={i} />
                  ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">Tech Stack</span>
          <div className="mt-6">
            <Marquee items={marqueeItems} speed={30} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
