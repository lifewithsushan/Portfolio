import { motion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
};

export function RevealWords({ text, className = "", delay = 0 }: Props) {
  const words = text.split(" ");
  return (
    <span className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top leading-[1.4]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: delay + i * 0.04, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {word}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
