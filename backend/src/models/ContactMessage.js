const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ContactMessage = sequelize.define(
  "ContactMessage",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: true },
    message: { type: DataTypes.TEXT, allowNull: false },
    status: {
      type: DataTypes.ENUM("New", "Read", "Resolved"),
      defaultValue: "New",
    },
  },
  {
    tableName: "contact_messages",
    timestamps: true,
  }
);

module.exports = ContactMessage;
