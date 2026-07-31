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
  },
  {
    tableName: "colleges",
    timestamps: true,
  }
);

module.exports = College;
