const { ContactMessage } = require("../models");
const sendEmail = require("../utils/sendEmail");

/** POST /api/contact — public, Contact Us form */
async function submitMessage(req, res, next) {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required." });
    }

    // 1. Save to Database
    const savedMsg = await ContactMessage.create({ name, email, phone, message });

    // 2. Send instant Email Notification to Admin (nitin.231218@gmail.com)
    try {
      await sendEmail({
        to: process.env.SMTP_USER || "nitin.231218@gmail.com",
        subject: `📩 New Website Inquiry from ${name} - Festival of Independence`,
        text: `New Contact Us Message:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nMessage:\n${message}`,
        html: `
          <div style="font-family: sans-serif; max-width: 550px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
            <h2 style="color: #1E293B; margin-top: 0;">📩 New Contact Us Message</h2>
            <p style="color: #64748B; font-size: 13px;">Festival of Independence Website Inquiry</p>
            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 15px 0;" />
            <table style="width: 100%; font-size: 13px; color: #334155;">
              <tr><td style="font-weight: bold; width: 100px; padding: 6px 0;">From:</td><td>${name}</td></tr>
              <tr><td style="font-weight: bold; padding: 6px 0;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="font-weight: bold; padding: 6px 0;">Phone:</td><td>${phone || "Not provided"}</td></tr>
            </table>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-top: 15px; font-size: 13px; color: #1e293b; line-height: 1.6;">
              <strong>Message:</strong><br />
              ${message.replace(/\n/g, "<br />")}
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Failed to send admin contact email notification:", emailErr);
    }

    res.status(201).json({ message: "Thank you — we'll get back to you soon.", id: savedMsg.id });
  } catch (err) {
    next(err);
  }
}

/** GET /api/contact — admin only, view inbox */
async function listMessages(req, res, next) {
  try {
    const messages = await ContactMessage.findAll({ order: [["createdAt", "DESC"]] });
    res.json(messages);
  } catch (err) {
    next(err);
  }
}

/** PUT /api/contact/:id/status — admin only */
async function updateMessageStatus(req, res, next) {
  try {
    const { status } = req.body;
    const msg = await ContactMessage.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message not found." });
    await msg.update({ status });
    res.json(msg);
  } catch (err) {
    next(err);
  }
}

module.exports = { submitMessage, listMessages, updateMessageStatus };
