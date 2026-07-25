import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { testimonials } from "@/data/testimonials";
import { staggerContainer, staggerItem } from "@/hooks/useAnimateInView";
import { fadeUp } from "@/hooks/useTextReveal";

export function Testimonials() {
  return (
    <section id="testimonials" className="px-6 sm:px-8 py-28 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[var(--primary)]/2 blur-[120px] pointer-events-none" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-[clamp(2rem,5.5vw,4rem)] mt-4 leading-tight relative inline-block">
            What people <span className="text-[var(--primary)]">say</span>
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
          className="mt-14 grid gap-6 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((item) => (
            <motion.div
              key={item.name}
              variants={staggerItem}
              className="card-hover rounded-2xl border border-[var(--border)] p-6"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={14} className="fill-[var(--primary)] text-[var(--primary)]" />
                ))}
              </div>
              <p className="text-[15px] leading-7 text-[var(--text)]/70">&ldquo;{item.text}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3 border-t border-[var(--border)] pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[13px] font-semibold text-[var(--primary)]">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-[var(--muted)]">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
