const SensorData = require("../models/SensorData");

exports.getLatest = async (req, res) => {
  try {
    const data = await SensorData.findOne({
      order: [["created_at", "DESC"]],
    });

    if (!data) {
      return res.status(200).json(null);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("getLatest error:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await SensorData.findAll({
      order: [["created_at", "DESC"]],
      limit: 50,
    });

    return res.status(200).json(history);
  } catch (error) {
    console.error("getHistory error:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      device_id = "WRIST-001",
      mode = "ADULT",
      heart_rate = 0,
      spo2 = 0,
      accel_x = 0,
      accel_y = 0,
      accel_z = 0,
      total_accel = 0,
      battery_voltage = null,
      battery_percent = null,
      latitude = null,
      longitude = null,
      status = "NORMAL",
    } = req.body;

    const data = await SensorData.create({
      device_id,
      mode,
      heart_rate,
      spo2,
      accel_x,
      accel_y,
      accel_z,
      total_accel,
      battery_voltage,
      battery_percent,
      latitude,
      longitude,
      status,
    });

    return res.status(201).json(data);
  } catch (error) {
    console.error("create sensor error:", error);
    return res.status(500).json({ error: error.message });
  }
};