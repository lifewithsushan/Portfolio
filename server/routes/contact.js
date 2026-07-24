import { Router } from "express";
import nodemailer from "nodemailer";

export const contactRouter = Router();

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

const OWNER_EMAIL = process.env.OWNER_EMAIL || "sushankc89@gmail.com";

async function notifyOwner({ name, email, message }) {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
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
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Sushan KC Khatri" <${process.env.EMAIL_USER}>`,
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

  try {
    await Promise.allSettled([
      notifyOwner({ name, email, message }),
      autoReply({ name, email }),
      sendWhatsApp({ name, email, message }),
    ]);

    res.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ error: "Failed to process contact form" });
  }
});