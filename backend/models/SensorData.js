const { DataTypes } = require("sequelize")
const sequelize = require("../db/db")

const SensorData = sequelize.define("SensorData",{

device_id: DataTypes.STRING,
heart_rate: DataTypes.INTEGER,
spo2: DataTypes.INTEGER,
accel_x: DataTypes.FLOAT,
accel_y: DataTypes.FLOAT,
accel_z: DataTypes.FLOAT,
gyro_x: DataTypes.FLOAT,
gyro_y: DataTypes.FLOAT,
gyro_z: DataTypes.FLOAT

})

module.exports = SensorData