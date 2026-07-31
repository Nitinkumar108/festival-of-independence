const { Student, College, Event, Payment, Notification, EventRegistration } = require("../models");

/** GET /api/students/me */
async function getMyProfile(req, res, next) {
  try {
    const student = await Student.findByPk(req.user.id, {
      attributes: { exclude: ["passwordHash"] },
      include: [{ model: College, attributes: ["id", "name"] }],
    });
    if (!student) return res.status(404).json({ message: "Student not found." });
    res.json(student);
  } catch (err) {
    next(err);
  }
}

/** PUT /api/students/me */
async function updateMyProfile(req, res, next) {
  try {
    const { fullName, phoneNumber, address, collegeId } = req.body;
    const student = await Student.findByPk(req.user.id);
    if (!student) return res.status(404).json({ message: "Student not found." });

    await student.update({ fullName, phoneNumber, address, collegeId });
    res.json({ message: "Profile updated successfully." });
  } catch (err) {
    next(err);
  }
}

/** GET /api/students/me/schedule — upcoming festival programs, visible after login */
async function getMySchedule(req, res, next) {
  try {
    const events = await Event.findAll({
      where: { dateTime: { [require("sequelize").Op.gte]: new Date() } },
      order: [["dateTime", "ASC"]],
    });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

/** GET /api/students/me/payments */
async function getMyPayments(req, res, next) {
  try {
    const payments = await Payment.findAll({
      where: { studentId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.json(payments);
  } catch (err) {
    next(err);
  }
}

/** GET /api/students/me/notifications — broadcast notifications for student */
async function getMyNotifications(req, res, next) {
  try {
    const notifications = await Notification.findAll({
      where: { targetRole: "student" },
      order: [["createdAt", "DESC"]],
    });
    res.json(notifications);
  } catch (err) {
    next(err);
  }
}

/** GET /api/students/me/registered-events — events registered by student */
async function getMyRegisteredEvents(req, res, next) {
  try {
    const registrations = await EventRegistration.findAll({
      where: { studentId: req.user.id },
      include: [{ model: Event }],
      order: [["createdAt", "DESC"]],
    });
    const events = registrations.map((r) => r.Event).filter(Boolean);
    res.json(events);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getMyProfile,
  updateMyProfile,
  getMySchedule,
  getMyPayments,
  getMyNotifications,
  getMyRegisteredEvents,
};
