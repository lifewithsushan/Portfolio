import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "@/data/navigation";
import { FlipButton } from "@/components/ui/FlipButton";

type NavbarProps = {
  mobileMenuOpen: boolean;
  onToggleMobile: () => void;
  onMobileClose: () => void;
};

export function Navbar({ mobileMenuOpen, onToggleMobile, onMobileClose }: NavbarProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full nav-glass px-4 sm:px-5 lg:px-7 py-2.5 sm:py-3 relative before:absolute before:inset-0 before:rounded-full before:pointer-events-none before:border before:border-[var(--primary)]/10 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100">
        <motion.a
          href="#home"
          className="group relative shrink-0"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/5 group-hover:bg-[var(--primary)]/10 group-hover:border-[var(--primary)]/50 transition-all duration-300">
              <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[var(--primary)] group-hover:drop-shadow-[0_0_6px_rgba(212,168,83,0.4)] transition-all duration-300">
                SK
              </span>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] lg:text-xs font-medium tracking-wide text-[var(--text)]/80 group-hover:text-[var(--text)] transition-colors duration-300">
                  Sushan KC Khatri
                </span>
                <span className="hidden lg:inline h-3 w-px bg-[var(--border)]" />
                <span className="hidden lg:inline text-[10px] font-medium tracking-[0.15em] uppercase text-[var(--muted)] group-hover:text-[var(--text)]/60 transition-colors duration-300">
                  Nepal
                </span>
              </div>
            </div>
          </div>
        </motion.a>

        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              className="relative"
              style={{ perspective: "600px" }}
            >
              <a
                href={link.href}
                className="flip-nav-link group relative block cursor-pointer px-3 py-1.5 rounded-lg hover:bg-[var(--card-bg)] transition-colors duration-300"
              >
                <span
                  className="flip-inner relative block transition-transform duration-500"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <span
                    className="flex items-center text-[13px] lg:text-sm text-[var(--text)]/50 group-hover:text-[var(--text)]/80 transition-colors duration-300"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="absolute inset-0 flex items-center text-[13px] lg:text-sm text-[var(--primary)]"
                    style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
                  >
                    {link.label}
                  </span>
                </span>
                <span className="absolute -bottom-0.5 left-3 right-3 h-px bg-[var(--primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="ml-2"
          >
            <FlipButton
              href="#contact"
              front={
                <span className="inline-flex rounded-full bg-white px-4 lg:px-5 py-1.5 lg:py-2 text-[12px] lg:text-sm font-medium text-[#0a0a0a] whitespace-nowrap">
                  Start Project
                </span>
              }
              back={
                <span className="inline-flex rounded-full border border-[var(--border)] px-4 lg:px-5 py-1.5 lg:py-2 text-[12px] lg:text-sm font-medium text-[var(--text)] whitespace-nowrap">
                  Let&rsquo;s Talk
                </span>
              }
            />
          </motion.div>
        </nav>

        <motion.button
            type="button"
            className="md:hidden inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)] transition-all duration-300"
            onClick={onToggleMobile}
            aria-label="Menu"
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <FiX size={15} /> : <FiMenu size={15} />}
          </motion.button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 sm:mt-3 max-w-sm overflow-hidden rounded-2xl nav-glass p-4 sm:p-5 md:hidden"
          >
            <div className="grid gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={onMobileClose}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="relative rounded-xl px-4 py-3 text-sm text-[var(--text)]/60 transition hover:bg-[var(--card-bg)] hover:text-[var(--text)] hover:pl-6 duration-300 before:absolute before:left-0 before:top-3 before:bottom-3 before:w-0.5 before:bg-[var(--primary)] before:scale-y-0 hover:before:scale-y-100 before:transition-transform before:duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-2">
                <FlipButton
                  href="#contact"
                  front={
                    <span className="block w-full rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-[#0a0a0a]">
                      Start Project
                    </span>
                  }
                  back={
                    <span className="block w-full rounded-xl border border-[var(--border)] px-4 py-3 text-center text-sm font-medium text-[var(--text)]">
                      Contact Me
                    </span>
                  }
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
