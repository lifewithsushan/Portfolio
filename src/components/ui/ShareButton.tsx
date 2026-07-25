import { FiShare2 } from "react-icons/fi";

export function ShareButton() {
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Sushan KC Khatri - Portfolio",
          text: "Full Stack Developer & AI/ML Engineer",
          url: window.location.href,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <button
      onClick={share}
      className="fixed bottom-6 left-20 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card-bg)]/80 backdrop-blur-md text-[var(--muted)] shadow-lg transition hover:border-[var(--primary)]/30 hover:text-[var(--primary)]"
      title="Share portfolio"
    >
      <FiShare2 size={16} />
    </button>
  );
}
