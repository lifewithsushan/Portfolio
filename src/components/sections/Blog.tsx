import { motion } from "framer-motion";
import { FiCalendar, FiArrowRight } from "react-icons/fi";
import { blogPosts } from "@/data/blog";
import { staggerContainer, staggerItem } from "@/hooks/useAnimateInView";
import { fadeUp } from "@/hooks/useTextReveal";

export function Blog() {
  return (
    <section id="blog" className="px-6 sm:px-8 py-28 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-[var(--primary)]/2 blur-[100px] pointer-events-none" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-[clamp(2rem,5.5vw,4rem)] mt-4 leading-tight relative inline-block">
            Latest <span className="text-[var(--primary)]">articles</span>
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
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.title}
              variants={staggerItem}
              className="card-hover group rounded-2xl border border-[var(--border)] p-6 flex flex-col"
            >
              <div className="flex items-center gap-2 text-[12px] text-[var(--muted)] mb-3">
                <FiCalendar size={12} />
                {post.date}
              </div>
              <h3 className="text-[17px] font-semibold leading-snug group-hover:text-[var(--primary)] transition-colors">{post.title}</h3>
              <p className="mt-2.5 text-[14px] leading-6 text-[var(--text)]/50 flex-1">{post.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-2.5 py-0.5 text-[11px] text-[var(--muted)]">{tag}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[13px] text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                Read more <FiArrowRight size={12} />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
