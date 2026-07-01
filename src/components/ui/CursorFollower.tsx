import { useEffect, useRef } from "react";

export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (auraRef.current) auraRef.current.style.opacity = "0";
    };

    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (auraRef.current) auraRef.current.style.opacity = "1";
    };

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      }
      if (auraRef.current) {
        auraRef.current.style.transform = `translate(${mouse.current.x - 100}px, ${mouse.current.y - 100}px)`;
      }

      raf = requestAnimationFrame(animate);
    };

    let raf = requestAnimationFrame(animate);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] h-[6px] w-[6px] rounded-full bg-[var(--primary)] transition-opacity duration-300"
        style={{ boxShadow: "0 0 8px var(--primary)" }}
      />
      <div
        ref={auraRef}
        className="pointer-events-none fixed z-[9998] h-[200px] w-[200px] rounded-full opacity-0 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, rgba(212,168,83,0.08) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
