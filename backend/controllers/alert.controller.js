const Alert = require("../models/Alerts");

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.findAll({
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json(alerts);
  } catch (error) {
    console.error("getAlerts error:", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.createAlert = async (req, res) => {
  try {
    const {
      device_id = "WRIST-001",
      alert_type = "EMERGENCY",
      message,
      heart_rate = 0,
      spo2 = 0,
      latitude = null,
      longitude = null,
    } = req.body;

    const alert = await Alert.create({
      device_id,
      alert_type,
      message,
      heart_rate,
      spo2,
      latitude,
      longitude,
    });

    return res.status(201).json(alert);
  } catch (error) {
    console.error("createAlert error:", error);
    return res.status(500).json({ message: error.message });
  }
};