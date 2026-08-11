import { Router } from "express";

export const chatRouter = Router();

const MODEL = "gemini-2.0-flash-lite";

const SYSTEM_PROMPT = `You are an AI assistant for Sushan KC Khatri's portfolio website. Answer questions about Sushan concisely and helpfully.

About Sushan:
- Full Stack Developer & AI/ML Engineer
- Teaches Python at Arniko International Academy
- Previously handled technical sales at The IT Company
- Based in Satdobato, Lalitpur, Nepal
- Email: mail@sushankckhatri.com.np | Phone: 9769364562
- Open to freelance, startup collabs, and full-time opportunities

Tech stack: Python, FastAPI, React, Tailwind CSS, PostgreSQL, Pandas, NumPy, Docker, ML fundamentals

Projects:
1. Ecommerce platform (FastAPI + React)
2. EV air-quality analysis
3. Student performance analytics
4. Python banking system

Keep responses under 3 sentences. Be friendly and professional. If asked something outside Sushan's context, politely redirect.`;

function getFallbackReply(message) {
  const m = message.toLowerCase();

  if (/\b(hello|hi|hey|sup|yo|howdy|good morning|good evening)\b/i.test(m)) {
    return "Hey there! I manage everything about Sushan — skills, projects, experience, education, certifications, contact, and more. What would you like to know?";
  }

  if (/how are you|how doin|how is it going/i.test(m)) {
    return "I'm doing great! Ready to help you learn about Sushan. What would you like to know?";
  }

  if (/who|about|tell me|introduce|yourself/i.test(m) && /sushan|you/i.test(m)) {
    return "Sushan KC Khatri is a Full Stack Developer & AI/ML Engineer from Satdobato, Lalitpur, Nepal. He teaches Python at Arniko International Academy and has experience in technical sales. He's open to freelance, startup collabs, and full-time opportunities!";
  }

  if (/skill|tech stack|technology|technologies|what (does|can) .* (use|work)|stack|programming language|framework|tool/i.test(m)) {
    return "Sushan works with Python, FastAPI, React, Tailwind CSS, PostgreSQL, Pandas, NumPy, Docker, and ML fundamentals. He's a Full Stack Developer & AI/ML Engineer.";
  }

  if (/project|work|built|create|make|portfolio/i.test(m)) {
    return "Sushan has built: 1) An Ecommerce platform (FastAPI + React), 2) EV air-quality analysis, 3) Student performance analytics, and 4) A Python banking system. Which one would you like to know more about?";
  }

  if (/ecommerce|shop|store|buy|sell/i.test(m)) {
    return "Sushan built an Ecommerce platform using FastAPI and React. It's one of his featured projects on his portfolio!";
  }

  if (/ev|electric vehicle|air quality|environment|pollution/i.test(m)) {
    return "Sushan worked on an EV air-quality analysis project, analyzing the environmental impact of electric vehicles. It's one of his data-driven projects.";
  }

  if (/student|performance|analytics|education|academic/i.test(m)) {
    return "Sushan developed a Student Performance Analytics project that analyzes academic data to derive insights. It showcases his data analysis skills.";
  }

  if (/banking|bank|python banking|financial/i.test(m)) {
    return "Sushan built a Python Banking System — a practical application demonstrating his Python programming skills.";
  }

  if (/experience|work|job|career|profession/i.test(m)) {
    return "Sushan is a Full Stack Developer & AI/ML Engineer who teaches Python at Arniko International Academy and previously handled technical sales at The IT Company. He's based in Satdobato, Lalitpur, Nepal.";
  }

  if (/teach|teacher|instructor|arniko|academy|python teacher|class|student/i.test(m)) {
    return "Sushan teaches Python at Arniko International Academy, sharing his knowledge with students interested in programming and technology.";
  }

  if (/sales|the it company|it company|technical sales/i.test(m)) {
    return "Sushan previously worked in technical sales at The IT Company, where he combined his technical knowledge with client-facing skills.";
  }

  if (/education|study|learn|degree|qualification|college|school|university|certification|certificate/i.test(m)) {
    return "Sushan is a Full Stack Developer & AI/ML Engineer. He teaches Python at Arniko International Academy. For specific educational qualifications, feel free to contact him directly at mail@sushankckhatri.com.np.";
  }

  if (/contact|reach|email|phone|call|whatsapp|viber|telegram|get in touch|hire|freelance|collab|opportunity|job/i.test(m)) {
    return "You can reach Sushan via email at mail@sushankckhatri.com.np or call him at 9769364562. He's open to freelance projects, startup collaborations, and full-time opportunities!";
  }

  if (/location|based|live|where|satdobato|lalitpur|nepal|address|city|country/i.test(m)) {
    return "Sushan is based in Satdobato, Lalitpur, Nepal. He's open to remote opportunities worldwide!";
  }

  if (/resume|cv|download|resume\b|hire/i.test(m)) {
    return "You can find Sushan's resume and all his details right here on his portfolio. For specific inquiries, email him at mail@sushankckhatri.com.np.";
  }

  if (/github|code|repository|open.source|source/i.test(m)) {
    return "You can find Sushan's code and projects on GitHub. Check out the links on his portfolio to explore his repositories!";
  }

  if (/linkedin|profile|connect/i.test(m)) {
    return "You can connect with Sushan on LinkedIn — the link is available on his portfolio website.";
  }

  if (/certification|certificate|course|training|qualification/i.test(m)) {
    return "Sushan has expertise as a Full Stack Developer & AI/ML Engineer. For specific certification details, reach out to him at mail@sushankckhatri.com.np.";
  }

  if (/\b(i )?love (you|u)|i luv/i.test(m)) {
    return "I love you too! 💛 Sushan sends his love right back. Is there anything else you'd like to know about him?";
  }

  if (/thank|thanks|appreciate|grateful|awesome|great|nice/i.test(m)) {
    return "You're welcome! Feel free to ask if you have any more questions about Sushan. Happy browsing!";
  }

  if (/bye|goodbye|see you|later|cya|talk later|exit|quit/i.test(m)) {
    return "Thanks for stopping by! Feel free to come back if you have more questions about Sushan. Have a great day!";
  }

  const randomGreetings = [
    "I'm here to help with anything about Sushan! Ask me about his skills, projects, experience, or how to get in touch.",
    "Not sure what to ask? Try 'what are his skills?', 'tell me about his projects', or 'how to contact him!'",
    "I can tell you all about Sushan — his work, his tech stack, his projects, and more. What interests you?",
    "Curious about Sushan? I know about his experience, education, certifications, contact info, and projects. Ask away!",
  ];
  return randomGreetings[Math.floor(Math.random() * randomGreetings.length)];
}

chatRouter.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents: [
              {
                role: "user",
                parts: [{ text: message }],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return res.json({ reply: text });
        }
      } else {
        console.error("Gemini API error:", response.status);
      }
    } catch (err) {
      console.error("Chat error:", err);
    }
  }

  res.json({ reply: getFallbackReply(message) });
});
