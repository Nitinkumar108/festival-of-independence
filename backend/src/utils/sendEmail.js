const nodemailer = require("nodemailer");

/**
 * Creates a fresh SMTP transporter for each call.
 * Pooled connections go stale when the server is idle — Gmail closes
 * them after ~1-2 min, causing silent send failures on the next registration.
 * A fresh transporter per email is slower but reliable for low-volume apps.
 */
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: parseInt(process.env.SMTP_PORT) === 465,
    // No pool — avoids stale connection reuse
    connectionTimeout: 15000,  // 15s — Gmail can be slow from cloud IPs
    greetingTimeout:  10000,   // 10s
    socketTimeout:    20000,   // 20s
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

/**
 * Sends an email using nodemailer with one automatic retry on failure.
 */
async function sendEmail({ to, subject, text, html }) {
  const MAX_ATTEMPTS = 2;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const mailer = createTransporter();
    try {
      await mailer.sendMail({
        from: process.env.EMAIL_FROM || '"Festival of Independence" <no-reply@iyfkolkata.org>',
        to,
        subject,
        text,
        html,
      });
      console.log(`[EMAIL] ✅ Sent to ${to} (attempt ${attempt})`);
      return; // success — exit
    } catch (err) {
      console.warn(`[EMAIL] ⚠️  Attempt ${attempt}/${MAX_ATTEMPTS} failed for ${to}: ${err.message}`);
      if (attempt === MAX_ATTEMPTS) {
        // All attempts exhausted — log full details for debugging
        console.warn("======================================================================");
        console.warn(`[EMAIL] ❌ FINAL FAILURE — could not send to: ${to}`);
        console.warn(`SUBJECT: ${subject}`);
        console.warn(`ERROR: ${err.message}`);
        console.warn(`SMTP_USER: ${process.env.SMTP_USER}`);
        console.warn("TEXT CONTENT:");
        console.warn(text);
        console.warn("======================================================================");
      } else {
        // Wait 2s before retrying
        await new Promise((r) => setTimeout(r, 2000));
      }
    }
  }
}

module.exports = sendEmail;
