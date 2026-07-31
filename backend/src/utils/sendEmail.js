const nodemailer = require("nodemailer");

/**
 * Sends a password reset email using nodemailer, or falls back to logging the reset link to the console.
 */
async function sendEmail({ to, subject, text, html }) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false, // true for port 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Festival of Independence" <no-reply@iyfkolkata.org>',
      to,
      subject,
      text,
      html,
    });
    console.log(`Password reset email successfully sent to: ${to}`);
  } catch (err) {
    console.warn("\n======================================================================");
    console.warn("⚠️  SMTP EMAIL DISPATCH FAILED. (You can ignore this in local development)");
    console.warn("Falling back to console logging: here is the email content:");
    console.warn(`TO: ${to}`);
    console.warn(`SUBJECT: ${subject}`);
    console.warn("MESSAGE TEXT:");
    console.warn(text);
    console.warn("======================================================================\n");
  }
}

module.exports = sendEmail;
