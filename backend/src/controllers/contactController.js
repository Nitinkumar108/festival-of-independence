const { ContactMessage } = require("../models");

/** POST /api/contact — public, Contact Us form */
async function submitMessage(req, res, next) {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required." });
    }
    await ContactMessage.create({ name, email, phone, message });
    res.status(201).json({ message: "Thank you — we'll get back to you soon." });
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
