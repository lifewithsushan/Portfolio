import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import { staggerContainer, staggerItem } from "@/hooks/useAnimateInView";
import { fadeUp } from "@/hooks/useTextReveal";

const faqs = [
  {
    q: "What technologies do you work with?",
    a: "I specialize in Python, FastAPI, React, TypeScript, Tailwind CSS, PostgreSQL, and data analysis tools like Pandas and NumPy. I also work with Docker, Git, and practical ML foundations.",
  },
  {
    q: "What kind of projects do you take on?",
    a: "I work on full stack web applications, REST API development, data analysis & visualization projects, and AI/ML-powered tools. I'm open to both short-term contracts and long-term collaborations.",
  },
  {
    q: "How quickly can you deliver a project?",
    a: "Timelines depend on scope, but most web applications take 2-6 weeks. Data analysis projects typically take 1-3 weeks. I'll provide a clear timeline after understanding your requirements.",
  },
  {
    q: "Do you offer ongoing support after delivery?",
    a: "Yes, I provide post-delivery support and maintenance packages. This includes bug fixes, updates, and feature enhancements as needed.",
  },
  {
    q: "How can we start working together?",
    a: "Simply reach out through the contact form below. Tell me about your project, timeline, and budget. I'll respond within 24 hours to schedule a call.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 sm:px-8 py-28 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/[0.015] blur-[120px] pointer-events-none" />
      <div className="mx-auto max-w-3xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="text-[clamp(2rem,5.5vw,4rem)] mt-4 leading-tight relative inline-block">
            Any <span className="text-[var(--primary)]">questions?</span>
            <motion.span
              className="absolute -bottom-2 left-0 h-px bg-[var(--primary)]/40"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </h2>
          <p className="mt-4 text-[15px] text-white/40 max-w-md mx-auto leading-7">
            Can&rsquo;t find what you&rsquo;re looking for? Reach out and I&rsquo;ll answer personally.
          </p>
        </motion.div>

        <motion.div
          className="mt-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="faq-item py-6"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-[15px] font-medium pr-4">{faq.q}</span>
                <span className="shrink-0 text-white/30 transition-transform duration-300" style={{ transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)" }}>
                  {openIndex === i ? <FiMinus size={18} /> : <FiPlus size={18} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.p
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden mt-4 text-[15px] text-white/45 leading-7 max-w-xl"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
