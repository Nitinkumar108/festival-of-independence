const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    razorpayOrderId: { type: DataTypes.STRING, allowNull: false },
    razorpayPaymentId: { type: DataTypes.STRING, allowNull: true },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: {
      type: DataTypes.ENUM("Created", "Success", "Failed"),
      defaultValue: "Created",
    },
    paymentType: {
      type: DataTypes.ENUM("RegistrationFee", "Donation"),
      defaultValue: "RegistrationFee",
    },
  },
  {
    tableName: "payments",
    timestamps: true,
  }
);

module.exports = Payment;
