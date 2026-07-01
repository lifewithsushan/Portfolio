import { useRef, type ReactNode } from "react";

type FlipButtonProps = {
  front: ReactNode;
  back: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  download?: boolean;
  type?: "button" | "submit" | "reset";
};

export function FlipButton({ front, back, href, onClick, className = "", download, type }: FlipButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };

  const onMouseLeave = () => {
    if (wrapRef.current) wrapRef.current.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg)";
  };

  const content = (
    <div
      ref={wrapRef}
      className={`flip-btn group relative inline-flex cursor-pointer transition-transform duration-200 ease-out ${className}`}
      style={{ perspective: "600px", transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="flip-btn-inner relative w-full transition-transform duration-500" style={{ transformStyle: "preserve-3d" }}>
        <div className="flip-btn-front" style={{ backfaceVisibility: "hidden" }}>
          {front}
        </div>
        <div
          className="flip-btn-back absolute inset-0 flex items-center justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
        >
          {back}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return <button type={type || "button"} onClick={onClick}>{content}</button>;
}
