const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Wristband = sequelize.define(
  "Wristband",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    device_id: { type: DataTypes.STRING, unique: true, allowNull: false },
    device_name: { type: DataTypes.STRING, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    tableName: "wristbands",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = Wristband;