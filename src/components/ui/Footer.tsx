import { motion } from "framer-motion";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiWhatsapp, SiViber } from "react-icons/si";
import { staggerContainer, staggerItem } from "@/hooks/useAnimateInView";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-[var(--border)] px-6 sm:px-8 py-16"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="grid gap-12 sm:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={staggerItem}>
            <a href="#home" className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--muted)]">
              <span className="text-[var(--primary)]">SK</span> / Nepal
            </a>
            <p className="mt-4 text-[15px] text-[var(--text)]/35 max-w-xs leading-7">
              Full Stack Developer &amp; AI/ML Engineer crafting intelligent digital experiences.
            </p>
            <div className="mt-6 flex gap-3">
              <motion.a
                href="https://github.com/lifewithsushan"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--border)] hover:text-[var(--text)]"
                whileHover={{ scale: 1.1, borderColor: "rgba(212,168,83,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub size={16} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/sushan-kc-khatri-93948a2b8"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--border)] hover:text-[var(--text)]"
                whileHover={{ scale: 1.1, borderColor: "rgba(212,168,83,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FiLinkedin size={16} />
              </motion.a>
              <motion.a
                href="https://wa.me/9779769364562"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--border)] hover:text-[var(--text)]"
                whileHover={{ scale: 1.1, borderColor: "rgba(212,168,83,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <SiWhatsapp size={16} />
              </motion.a>
              <motion.a
                href="viber://chat?number=%2B9779769364562"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--border)] hover:text-[var(--text)]"
                whileHover={{ scale: 1.1, borderColor: "rgba(212,168,83,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <SiViber size={16} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h4 className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">Navigation</h4>
            <div className="mt-5 grid gap-3">
              {["About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-[15px] text-[var(--muted)] transition hover:text-[var(--text)] relative w-fit after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[var(--primary)] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h4 className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">Contact</h4>
            <div className="mt-5 space-y-3 text-[15px] text-[var(--muted)]">
              <p>Satdobato, Lalitpur, Nepal</p>
              <p>Available for freelance &amp; collaboration</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-14 pt-8 border-t border-[var(--border)] text-center text-xs text-[var(--text)]/25"
        >
          &copy; {new Date().getFullYear()} Sushan KC Khatri. All rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
}
