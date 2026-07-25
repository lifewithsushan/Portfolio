import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGitBranch, FiStar, FiCode, FiExternalLink } from "react-icons/fi";
import { staggerContainer, staggerItem } from "@/hooks/useAnimateInView";
import { fadeUp } from "@/hooks/useTextReveal";
import type { GitHubRepo } from "@/types";

const GITHUB_USERNAME = "lifewithsushan";

export function GitHubStats() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [totalStars, setTotalStars] = useState(0);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        const mapped: GitHubRepo[] = data.map((r: any) => ({
          name: r.name,
          description: r.description || "No description",
          stars: r.stargazers_count,
          forks: r.forks_count,
          language: r.language || "N/A",
          url: r.html_url,
        }));
        setRepos(mapped);
        setTotalStars(mapped.reduce((s, r) => s + r.stars, 0));
      })
      .catch(() => {});
  }, []);

  if (repos.length === 0) return null;

  return (
    <section id="github" className="px-6 sm:px-8 py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[var(--primary)]/2 blur-[120px] pointer-events-none" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-[clamp(2rem,5.5vw,4rem)] mt-4 leading-tight relative inline-block">
            Open <span className="text-[var(--primary)]">source</span>
            <motion.span
              className="absolute -bottom-2 left-0 h-px bg-[var(--primary)]/40"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </h2>
          <div className="mt-4 flex items-center gap-6 text-sm text-[var(--muted)]">
            <span className="inline-flex items-center gap-1.5">
              <FiStar size={14} className="text-[var(--primary)]" />
              {totalStars} stars
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiGitBranch size={14} className="text-[var(--primary)]" />
              {repos.length} repos
            </span>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {repos.map((repo) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={staggerItem}
              className="card-hover group rounded-2xl border border-[var(--border)] p-5 block"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-semibold truncate group-hover:text-[var(--primary)] transition-colors">{repo.name}</h3>
                  <p className="mt-1.5 text-[13px] text-[var(--muted)] line-clamp-2">{repo.description}</p>
                </div>
                <FiExternalLink size={14} className="mt-1 shrink-0 text-[var(--muted)] group-hover:text-[var(--primary)] transition-colors" />
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs text-[var(--muted)]">
                {repo.language !== "N/A" && (
                  <span className="inline-flex items-center gap-1.5">
                    <FiCode size={12} />
                    {repo.language}
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  <FiStar size={12} /> {repo.stars}
                </span>
                <span className="inline-flex items-center gap-1">
                  <FiGitBranch size={12} /> {repo.forks}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
