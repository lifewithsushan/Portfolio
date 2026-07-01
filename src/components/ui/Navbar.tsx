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
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full nav-glass px-4 sm:px-5 lg:px-7 py-2.5 sm:py-3">
        <motion.a
          href="#home"
          className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-white/50 shrink-0"
          whileHover={{ color: "rgba(212,168,83,0.8)" }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-[var(--primary)]">SK</span>{" "}
          <span className="hidden xs:inline">/ Nepal</span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-4 lg:gap-5">
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
                className="flip-nav-link group relative block cursor-pointer py-1"
              >
                <span
                  className="flip-inner relative block transition-transform duration-500"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <span
                    className="flex items-center text-[13px] lg:text-sm text-white/50"
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
                <span className="inline-flex rounded-full bg-white px-4 lg:px-5 py-1.5 lg:py-2 text-[12px] lg:text-sm font-medium text-[var(--bg)] whitespace-nowrap">
                  Start Project
                </span>
              }
              back={
                <span className="inline-flex rounded-full border border-white/30 px-4 lg:px-5 py-1.5 lg:py-2 text-[12px] lg:text-sm font-medium text-white whitespace-nowrap">
                  Let&rsquo;s Talk
                </span>
              }
            />
          </motion.div>
        </nav>

        <motion.button
          type="button"
          className="md:hidden inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/10 text-white/50"
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
            <div className="grid gap-1.5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={onMobileClose}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-xl px-4 py-3 text-sm text-white/60 transition hover:bg-white/[0.04] hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-2">
                <FlipButton
                  href="#contact"
                  front={
                    <span className="block w-full rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-[var(--bg)]">
                      Start Project
                    </span>
                  }
                  back={
                    <span className="block w-full rounded-xl border border-white/30 px-4 py-3 text-center text-sm font-medium text-white">
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
