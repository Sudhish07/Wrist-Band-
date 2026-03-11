const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const SensorData = sequelize.define("SensorData", {

  heart_rate: {
    type: DataTypes.INTEGER
  },

  spo2: {
    type: DataTypes.INTEGER
  },

  latitude: {
    type: DataTypes.FLOAT
  },

  longitude: {
    type: DataTypes.FLOAT
  },

  status: {
    type: DataTypes.STRING
  }

});

module.exports = SensorData;