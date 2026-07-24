import { Router } from "express";

export const chatRouter = Router();

const MODEL = "gemini-flash-latest";

const SYSTEM_PROMPT = `You are an AI assistant for Sushan KC Khatri's portfolio website. Answer questions about Sushan concisely and helpfully.

About Sushan:
- Full Stack Developer & AI/ML Engineer
- Teaches Python at Arniko International Academy
- Previously handled technical sales at The IT Company
- Based in Satdobato, Lalitpur, Nepal
- Email: sushankc89@gmail.com | Phone: 9769364562
- Open to freelance, startup collabs, and full-time opportunities

Tech stack: Python, FastAPI, React, Tailwind CSS, PostgreSQL, Pandas, NumPy, Docker, ML fundamentals

Projects:
1. Ecommerce platform (FastAPI + React)
2. EV air-quality analysis
3. Student performance analytics
4. Python banking system

Keep responses under 3 sentences. Be friendly and professional. If asked something outside Sushan's context, politely redirect.`;

chatRouter.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY not set");
    return res.status(500).json({ error: "AI service not configured" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `${SYSTEM_PROMPT}\n\nUser: ${message}` }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini API error:", response.status, err);
      return res.status(502).json({ error: "AI service unavailable" });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return res.status(502).json({ error: "Empty response from AI" });
    }

    res.json({ reply: text });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Failed to generate reply" });
  }
});