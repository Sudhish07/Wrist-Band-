const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Alert = sequelize.define(
  "Alert",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    device_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "WRIST-001",
    },
    alert_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "EMERGENCY",
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heart_rate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    spo2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    is_viewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "alerts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = Alert;