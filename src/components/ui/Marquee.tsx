import { motion } from "framer-motion";

type Props = {
  items: { name: string; icon: React.ReactNode; color?: string }[];
  speed?: number;
};

export function Marquee({ items, speed = 25 }: Props) {
  return (
    <div className="relative overflow-hidden w-full">
      <motion.div
        className="flex gap-8 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-5 py-3"
          >
            <span style={{ color: item.color }} className="inline-flex">{item.icon}</span>
            <span className="text-sm font-medium text-[var(--muted)] whitespace-nowrap">{item.name}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
