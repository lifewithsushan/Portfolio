import { type KeyboardEvent, useState } from "react";
import { FiMessageSquare, FiSend, FiX } from "react-icons/fi";

type Message = {
  from: "bot" | "user";
  text: string;
};

function generateReply(text: string) {
  const q = text.toLowerCase();
  if (q.includes("skill") || q.includes("stack") || q.includes("technology"))
    return "I work with Python, FastAPI, React, Tailwind CSS, PostgreSQL, Pandas, NumPy, Docker, and ML fundamentals.";
  if (q.includes("project") || q.includes("work"))
    return "Highlighted projects include an ecommerce platform (FastAPI + React), EV air-quality analysis, student performance analytics, and a Python banking system.";
  if (q.includes("experience") || q.includes("job") || q.includes("teacher"))
    return "I teach Python at Arniko International Academy and previously handled technical sales at The IT Company.";
  if (q.includes("contact") || q.includes("hire") || q.includes("collaborate"))
    return "Reach out via email at sushankc89@gmail.com or call 9769364562. I'm open to freelance, startup collabs, and full-time opportunities.";
  if (q.includes("location") || q.includes("nepal"))
    return "I'm based in Satdobato, Lalitpur, Nepal — building globally from there.";
  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("greet"))
    return "Hey! Welcome. I can tell you about Sushan's skills, projects, experience, certifications, or how to reach him. What interests you?";
  return "I'm a Full Stack Developer & AI/ML Engineer focused on building intelligent, scalable digital experiences.";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hey there! I manage everything about Sushan — skills, projects, experience, education, certifications, contact, and more. What would you like to know?" },
  ]);

  const submit = () => {
    const t = input.trim();
    if (!t) return;
    setMessages((prev) => [...prev, { from: "user", text: t }, { from: "bot", text: generateReply(t) }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="w-[360px] overflow-hidden rounded-2xl border border-[var(--border)] shadow-2xl bg-[var(--card-bg)]/95"
          style={{ backdropFilter: "blur(24px)" }}
        >
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-[var(--primary)]/80">AI Assistant</p>
              <p className="mt-1 text-sm font-medium">Ask about Sushan</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:text-[var(--text)]"
            >
              <FiX size={14} />
            </button>
          </div>

          <div className="max-h-[320px] space-y-3 overflow-y-auto px-5 py-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[88%] rounded-xl px-4 py-3 text-sm leading-6 ${
                  msg.from === "bot"
                    ? "border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text)]/70"
                    : "ml-auto bg-[var(--primary)]/10 text-[var(--primary)]"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--border)] p-4">
            <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-1.5">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") { e.preventDefault(); submit(); }
                }}
                placeholder="Ask me anything..."
                className="w-full bg-transparent px-3 py-2 text-sm outline-none text-[var(--text)]/80 placeholder:text-[var(--text)]/25"
              />
              <button
                type="button"
                onClick={submit}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)] text-[#0a0a0a] transition hover:bg-[var(--primary)]"
              >
                <FiSend size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flip-btn group"
        style={{ perspective: "600px" }}
      >
        <div
          className="flip-btn-inner relative"
          style={{ transformStyle: "preserve-3d", transition: "transform 0.5s" }}
        >
          <div
            className="flip-btn-front flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-medium text-[#0a0a0a] shadow-lg"
            style={{ backfaceVisibility: "hidden" }}
          >
            <FiMessageSquare />
            {open ? "Close" : "Chat"}
          </div>
          <div
            className="flip-btn-back absolute inset-0 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-5 py-3 text-sm font-medium text-[var(--text)]/80"
            style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
          >
            {open ? "Hide" : "Ask me"}
          </div>
        </div>
      </button>
    </div>
  );
}
