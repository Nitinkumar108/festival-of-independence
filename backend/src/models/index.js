const sequelize = require("../config/db");
const Student = require("./Student");
const Admin = require("./Admin");
const College = require("./College");
const Payment = require("./Payment");
const Event = require("./Event");
const ContactMessage = require("./ContactMessage");
const OtpVerification = require("./OtpVerification");
const Notification = require("./Notification");
const EventRegistration = require("./EventRegistration");
const Testimonial = require("./Testimonial");

// ----- Associations -----
College.hasMany(Student, { foreignKey: "collegeId" });
Student.belongsTo(College, { foreignKey: "collegeId" });

Student.hasMany(Payment, { foreignKey: "studentId" });
Payment.belongsTo(Student, { foreignKey: "studentId" });

Student.hasMany(EventRegistration, { foreignKey: "studentId" });
EventRegistration.belongsTo(Student, { foreignKey: "studentId" });

Event.hasMany(EventRegistration, { foreignKey: "eventId" });
EventRegistration.belongsTo(Event, { foreignKey: "eventId" });

module.exports = {
  sequelize,
  Student,
  Admin,
  College,
  Payment,
  Event,
  ContactMessage,
  OtpVerification,
  Notification,
  EventRegistration,
  Testimonial,
};
