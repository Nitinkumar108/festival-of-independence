const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const College = sequelize.define(
  "College",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    clusterId: {
      type: DataTypes.UUID,
      allowNull: true, // null = pending/unassigned
      references: { model: "clusters", key: "id" },
    },
    isPending: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // true when a student self-registers a new unlisted college
    },
  },
  {
    tableName: "colleges",
    timestamps: true,
  }
);

module.exports = College;
