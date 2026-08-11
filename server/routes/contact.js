import { Router } from "express";

export const contactRouter = Router();

const OWNER_EMAIL = process.env.OWNER_EMAIL || "mail@sushankckhatri.com.np";

async function sendEmailViaAPI({ to, subject, html }) {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.warn("SENDGRID_API_KEY not set — skipping email");
    return;
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
}

async function notifyOwner({ name, email, message }) {
  await sendEmailViaAPI({
    to: OWNER_EMAIL,
    subject: `New inquiry from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote>${message}</blockquote>
    `,
  });
}

async function autoReply({ name, email }) {
  await sendEmailViaAPI({
    to: email,
    subject: "Thanks for reaching out!",
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="color: #d4a853;">Hi ${name},</h2>
        <p>Thanks for getting in touch! I've received your message and will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to check out my work:</p>
        <p>
          <a href="https://sushankckhatri.com.np" style="color: #d4a853;">Portfolio</a> &middot;
          <a href="https://github.com/sushankhatri" style="color: #d4a853;">GitHub</a>
        </p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <p style="color: #888; font-size: 13px;">Sushan KC Khatri &middot; Full Stack Developer & AI/ML Engineer</p>
      </div>
    `,
  });
}

async function sendWhatsApp({ name, email, message }) {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) return;

  const { default: twilio } = await import("twilio");
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_NUMBER,
    to: process.env.OWNER_WHATSAPP,
    body: `New inquiry from ${name} (${email}):\n\n${message}`,
  });
}

contactRouter.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  await Promise.allSettled([
    notifyOwner({ name, email, message }).catch((e) => console.error("notifyOwner failed:", e.message)),
    autoReply({ name, email }).catch((e) => console.error("autoReply failed:", e.message)),
    sendWhatsApp({ name, email, message }).catch((e) => console.error("sendWhatsApp failed:", e.message)),
  ]);

  res.json({ success: true });
});
