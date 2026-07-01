import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiMail, FiPhone, FiSend } from "react-icons/fi";
import type { FormData, FormStatus } from "@/types";
import { FlipButton } from "@/components/ui/FlipButton";
import { staggerContainer, staggerItem } from "@/hooks/useAnimateInView";
import { fadeUp } from "@/hooks/useTextReveal";

type ContactProps = {
  formData: FormData;
  formStatus: FormStatus;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onFieldChange: (field: keyof FormData, value: string) => void;
};

export function Contact({ formData, formStatus, onSubmit, onFieldChange }: ContactProps) {
  return (
    <section id="contact" className="px-6 sm:px-8 py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--primary)]/[0.02] to-transparent pointer-events-none" />
      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] mt-4 leading-tight max-w-lg relative inline-block">
            Let&rsquo;s <span className="text-[var(--primary)]">build something</span> together
            <motion.span
              className="absolute -bottom-2 left-0 h-px bg-[var(--primary)]/40"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <motion.div variants={staggerItem}>
                <a
                  href="mailto:sushankc89@gmail.com"
                  className="card-hover flex items-center gap-4 rounded-2xl border border-white/[0.06] p-5"
                >
                  <FiMail className="text-white/30 shrink-0" size={20} />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/30">Email</p>
                    <p className="mt-1 text-[15px]">sushankc89@gmail.com</p>
                  </div>
                </a>
              </motion.div>
              <motion.div variants={staggerItem}>
                <a href="tel:+9779769364562" className="card-hover flex items-center gap-4 rounded-2xl border border-white/[0.06] p-5">
                  <FiPhone className="text-white/30 shrink-0" size={20} />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/30">Phone</p>
                    <p className="mt-1 text-[15px]">9769364562</p>
                  </div>
                </a>
              </motion.div>
              <motion.div variants={staggerItem}>
                <div className="card-hover flex items-center gap-4 rounded-2xl border border-white/[0.06] p-5">
                  <div className="flex h-5 w-5 items-center justify-center shrink-0">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
                    </span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/30">Location</p>
                    <p className="mt-1 text-[15px]">Satdobato, Lalitpur, Nepal</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form onSubmit={onSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  required
                  value={formData.name}
                  onChange={(e) => onFieldChange("name", e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-[15px] text-white outline-none transition focus:border-white/20 placeholder:text-white/20 focus:ring-1 focus:ring-[var(--primary)]/20"
                />
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => onFieldChange("email", e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-[15px] text-white outline-none transition focus:border-white/20 placeholder:text-white/20 focus:ring-1 focus:ring-[var(--primary)]/20"
                />
              </div>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => onFieldChange("message", e.target.value)}
                placeholder="Tell me about your project."
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-[15px] text-white outline-none transition focus:border-white/20 placeholder:text-white/20 focus:ring-1 focus:ring-[var(--primary)]/20 resize-none"
              />
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-white/25">I&rsquo;ll respond within 24h</p>
                <FlipButton
                  type="submit"
                  front={
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[var(--bg)]">
                      Send
                      <FiSend size={14} />
                    </span>
                  }
                  back={
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white">
                      <FiArrowRight />
                      Submit
                    </span>
                  }
                />
              </div>
            </form>

            <AnimatePresence>
              {formStatus === "sent" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-5 rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/5 px-5 py-3.5 text-sm text-[var(--primary)]"
                >
                  Thanks! I&rsquo;ll get back to you within 24 hours.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
