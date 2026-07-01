import { useEffect, useState, useRef } from "react";

type UseCountUpOptions = {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
};

export function useCountUp({ end, duration = 2000, suffix = "", prefix = "", decimals = 0 }: UseCountUpOptions) {
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) return;
        setHasAnimated(true);

        const stepTime = 16;
        const totalSteps = duration / stepTime;
        const increment = end / totalSteps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= end) {
            setValue(end);
            clearInterval(timer);
          } else {
            setValue(current);
          }
        }, stepTime);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return {
    ref,
    display: `${prefix}${value.toFixed(decimals)}${suffix}`,
    raw: value,
  };
}
