const nodemailer = require("nodemailer");

let transporter = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: parseInt(process.env.SMTP_PORT) === 465,
      pool: true,
      maxConnections: 3,
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 8000,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

/**
 * Sends an email using nodemailer, or falls back to logging to console.
 */
async function sendEmail({ to, subject, text, html }) {
  try {
    const mailer = getTransporter();
    await mailer.sendMail({
      from: process.env.EMAIL_FROM || '"Festival of Independence" <no-reply@iyfkolkata.org>',
      to,
      subject,
      text,
      html,
    });
    console.log(`Email successfully dispatched to: ${to}`);
  } catch (err) {
    console.warn("\n======================================================================");
    console.warn(`⚠️  SMTP EMAIL DISPATCH FAILED: ${err.message}`);
    console.warn("Falling back to console logging: here is the email content:");
    console.warn(`TO: ${to}`);
    console.warn(`SUBJECT: ${subject}`);
    console.warn("MESSAGE TEXT:");
    console.warn(text);
    console.warn("======================================================================\n");
  }
}

module.exports = sendEmail;
