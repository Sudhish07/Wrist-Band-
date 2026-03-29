const mqtt = require("mqtt");
const SensorData = require("../models/SensorData");
const Alert = require("../models/Alerts");

const MQTT_BROKER = process.env.MQTT_BROKER || "mqtt://broker.hivemq.com:1883";
const DEVICE_ID = process.env.DEVICE_ID || "WRIST-001";

const TELEMETRY_TOPIC = `wristband/${DEVICE_ID}/telemetry`;
const ALERT_TOPIC = `wristband/${DEVICE_ID}/alerts`;

console.log("mqttService started...");

const client = mqtt.connect(MQTT_BROKER, {
  reconnectPeriod: 3000,
});

client.on("connect", () => {
  console.log("MQTT connected");

  client.subscribe([TELEMETRY_TOPIC, ALERT_TOPIC], (err) => {
    if (err) {
      console.error("MQTT subscribe error:", err.message);
    } else {
      console.log("Subscribed to topics:");
      console.log(TELEMETRY_TOPIC);
      console.log(ALERT_TOPIC);
    }
  });
});

client.on("message", async (topic, messageBuffer) => {
  try {
    const data = JSON.parse(messageBuffer.toString());

    if (topic === TELEMETRY_TOPIC) {
      await SensorData.create({
        device_id: data.device_id || "WRIST-001",
        mode: data.mode || "ADULT",
        heart_rate: data.heart_rate ?? 0,
        spo2: data.spo2 ?? 0,
        accel_x: data.accel_x ?? 0,
        accel_y: data.accel_y ?? 0,
        accel_z: data.accel_z ?? 0,
        total_accel: data.total_accel ?? 0,
        battery_voltage: data.battery_voltage ?? null,
        battery_percent: data.battery_percent ?? null,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        status: data.status || "NORMAL",
      });

      console.log("Telemetry saved");
    }

    if (topic === ALERT_TOPIC) {
      await Alert.create({
        device_id: data.device_id || "WRIST-001",
        alert_type: data.alert_type || "EMERGENCY",
        message: data.message || "Emergency alert",
        heart_rate: data.heart_rate ?? 0,
        spo2: data.spo2 ?? 0,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
      });

      console.log("Alert saved");
    }
  } catch (err) {
    console.error("MQTT error:", err.message);
  }
});

client.on("error", (err) => {
  console.error("MQTT client error:", err.message);
});

module.exports = client;