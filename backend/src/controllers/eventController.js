const { Event, EventRegistration, Student, College } = require("../models");

/** GET /api/events — public/student, lists upcoming events with poster & registration status */
async function listEvents(req, res, next) {
  try {
    const events = await Event.findAll({
      order: [["dateTime", "ASC"]],
      include: [{ model: EventRegistration, attributes: ["studentId"] }],
    });

    const studentId = req.user?.role === "student" ? req.user.id : null;

    const formatted = events.map((e) => {
      const plain = e.get({ plain: true });
      const registrationCount = plain.EventRegistrations ? plain.EventRegistrations.length : 0;
      const isRegistered = studentId
        ? (plain.EventRegistrations || []).some((r) => r.studentId === studentId)
        : false;
      delete plain.EventRegistrations;
      return {
        ...plain,
        registrationCount,
        isRegistered,
      };
    });

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

/** POST /api/events — admin only */
async function createEvent(req, res, next) {
  try {
    const { title, posterUrl, description, dateTime, joiningLink, venue } = req.body;
    if (!title || !dateTime) {
      return res.status(400).json({ message: "Title and date/time are required." });
    }
    const event = await Event.create({ title, posterUrl, description, dateTime, joiningLink, venue });
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
}

/** PUT /api/events/:id — admin only */
async function updateEvent(req, res, next) {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found." });
    await event.update(req.body);
    res.json(event);
  } catch (err) {
    next(err);
  }
}

/** DELETE /api/events/:id — admin only */
async function deleteEvent(req, res, next) {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found." });

    await EventRegistration.destroy({ where: { eventId: req.params.id } });
    await event.destroy();
    res.json({ message: "Event deleted." });
  } catch (err) {
    next(err);
  }
}

/** POST /api/events/:id/register — student only */
async function registerForEvent(req, res, next) {
  try {
    const eventId = req.params.id;
    const studentId = req.user.id;

    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ message: "Event not found." });

    const [registration, created] = await EventRegistration.findOrCreate({
      where: { eventId, studentId },
    });

    res.json({ message: created ? "Successfully registered for event!" : "Already registered.", registration });
  } catch (err) {
    next(err);
  }
}

/** DELETE /api/events/:id/register — student unregister */
async function unregisterFromEvent(req, res, next) {
  try {
    const eventId = req.params.id;
    const studentId = req.user.id;

    await EventRegistration.destroy({ where: { eventId, studentId } });
    res.json({ message: "Registration cancelled successfully." });
  } catch (err) {
    next(err);
  }
}

/** GET /api/events/:id/registrations — admin only, get attendees for event */
async function getEventAttendees(req, res, next) {
  try {
    const eventId = req.params.id;
    const registrations = await EventRegistration.findAll({
      where: { eventId },
      include: [
        {
          model: Student,
          attributes: ["id", "fullName", "email", "phoneNumber"],
          include: [{ model: College, attributes: ["name"] }],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const attendees = registrations.map((r) => ({
      registeredAt: r.createdAt,
      student: r.Student,
    }));

    res.json(attendees);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
  getEventAttendees,
};
