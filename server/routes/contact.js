import { Router } from "express";

export const contactRouter = Router();

const OWNER_EMAIL = process.env.OWNER_EMAIL || "mail@sushankckhatri.com.np";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendEmailViaAPI({ to, subject, html }) {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.warn("SENDGRID_API_KEY not set — skipping email");
    return false;
  }

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: "mail@sushankckhatri.com.np", name: "Sushan KC Khatri" },
      subject,
      content: [{ type: "text/html", value: html }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`SendGrid error ${res.status}: ${body}`);
  }
  return true;
}

async function notifyOwner({ name, email, message }) {
  return sendEmailViaAPI({
    to: OWNER_EMAIL,
    subject: `New inquiry from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <blockquote>${escapeHtml(message)}</blockquote>
    `,
  });
}

async function autoReply({ name, email }) {
  return sendEmailViaAPI({
    to: email,
    subject: "Thanks for reaching out!",
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="color: #d4a853;">Hi ${escapeHtml(name)},</h2>
        <p>Thanks for getting in touch! I've received your message and will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to check out my work:</p>
        <p>
          <a href="https://sushankckhatri.com.np" style="color: #d4a853;">Portfolio</a> &middot;
          <a href="https://github.com/lifewithsushan" style="color: #d4a853;">GitHub</a>
        </p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <p style="color: #888; font-size: 13px;">Sushan KC Khatri &middot; Full Stack Developer & AI/ML Engineer</p>
      </div>
    `,
  });
}

async function sendWhatsApp({ name, email, message }) {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) return false;

  const { default: twilio } = await import("twilio");
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_NUMBER,
    to: process.env.OWNER_WHATSAPP,
    body: `New inquiry from ${name} (${email}):\n\n${message}`,
  });
  return true;
}

contactRouter.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }
  if (name.length > 100 || email.length > 254 || message.length > 5000) {
    return res.status(400).json({ error: "One or more fields are too long" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "A valid email address is required" });
  }

  const results = await Promise.allSettled([
    notifyOwner({ name, email, message }),
    autoReply({ name, email }),
    sendWhatsApp({ name, email, message }),
  ]);

  results.forEach((result) => {
    if (result.status === "rejected") console.error("Contact notification failed:", result.reason);
  });

  const delivered = results.some((result) => result.status === "fulfilled" && result.value === true);
  if (!delivered) {
    return res.status(503).json({ error: "Message delivery is temporarily unavailable" });
  }

  res.json({ success: true });
});
