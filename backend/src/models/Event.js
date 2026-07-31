const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    posterUrl: { type: DataTypes.TEXT, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    dateTime: { type: DataTypes.DATE, allowNull: false },
    joiningLink: { type: DataTypes.STRING, allowNull: true },
    venue: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "events",
    timestamps: true,
  }
);

module.exports = Event;
