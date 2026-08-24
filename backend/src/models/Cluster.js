const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Cluster = sequelize.define(
  "Cluster",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // CC1, CC2, ... CC9
    },
    facilitatorName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accessToken: {
      type: DataTypes.STRING(64),
      allowNull: true,
      unique: true, // Used in shareable cluster links
    },
  },
  {
    tableName: "clusters",
    timestamps: true,
  }
);

module.exports = Cluster;
