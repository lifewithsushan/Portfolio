import { motion } from "framer-motion";
import { services } from "@/data/services";
import { FlipButton } from "@/components/ui/FlipButton";
import { TiltCard } from "@/components/ui/TiltCard";
import { staggerContainer, staggerItem } from "@/hooks/useAnimateInView";
import { fadeUp } from "@/hooks/useTextReveal";

export function Services() {
  return (
    <section id="services" className="px-6 sm:px-8 py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[var(--primary)]/2 blur-[120px] pointer-events-none" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-[clamp(2rem,5.5vw,4rem)] mt-4 leading-tight relative inline-block">
            What I <span className="text-[var(--primary)]">offer</span>
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
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={staggerItem}>
                <TiltCard intensity={4} className="card-hover group rounded-2xl border border-[var(--border)] p-6 h-full flex flex-col">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 text-[14px] leading-6 text-[var(--text)]/50">{service.description}</p>
                  <ul className="mt-4 space-y-2 flex-1">
                    {service.features.map((f) => (
                      <li key={f} className="text-[13px] text-[var(--muted)] flex items-start gap-2">
                        <span className="mt-1 h-1 w-1 rounded-full bg-[var(--primary)] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <FlipButton
                      href="#contact"
                      front={
                        <span className="inline-flex items-center gap-2 text-sm text-[var(--muted)] group-hover:text-[var(--text)] transition">
                          Get started
                        </span>
                      }
                      back={
                        <span className="inline-flex items-center gap-2 text-sm text-[var(--primary)]">
                          Let&rsquo;s talk
                        </span>
                      }
                    />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
