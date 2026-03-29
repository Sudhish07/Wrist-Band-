const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const SensorData = sequelize.define(
  "SensorData",
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
    mode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    heart_rate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    spo2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    accel_x: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    accel_y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    accel_z: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    total_accel: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    battery_voltage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    battery_percent: {
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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "NORMAL",
    },
  },
  {
    tableName: "sensor_data",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = SensorData;