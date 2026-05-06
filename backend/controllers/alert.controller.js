const Alert = require("../models/Alerts");

exports.getAlerts = async (req, res) => {
  try {
    let whereCondition = {};

    if (req.user.role !== "admin") {
      whereCondition.user_id = req.user.id;
    }

    const alerts = await Alert.findAll({
      where: whereCondition,
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json(alerts);
  } catch (error) {
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
      user_id: req.user.id, // ✅ important
    });

    return res.status(201).json(alert);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.downloadAlerts = async (req, res) => {
  try {
    let whereCondition = {};

    if (req.user.role !== "admin") {
      whereCondition.user_id = req.user.id;
    }

    const alerts = await Alert.findAll({ where: whereCondition });

    const csv = [
      ["ID", "Message", "Heart Rate", "SpO2", "Time"],
      ...alerts.map(a => [
        a.id,
        a.message,
        a.heart_rate,
        a.spo2,
        a.created_at,
      ])
    ]
      .map(row => row.join(","))
      .join("\n");

    res.header("Content-Type", "text/csv");
    res.attachment("alerts.csv");
    return res.send(csv);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};