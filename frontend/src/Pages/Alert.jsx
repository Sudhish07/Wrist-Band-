import { useEffect, useState } from "react";
import api from "../service/api";

const DEVICE_LOCATION_URL = "https://goo.gl/maps/twrwH1LJfYBB66uG6";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get("/alerts");
        setAlerts(res.data || []);
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
        setAlerts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-wrap">
      <div className="hero-section">
        <div>
          <p className="section-tag">Emergency Activity</p>
          <h1>Emergency Alerts</h1>
          <p className="hero-text">
            View recent alerts with health data and device location preview.
          </p>

          {/* ✅ Download Button */}
          <button
  className="location-btn"
  onClick={async () => {
    try {
      const res = await fetch("http://localhost:5000/api/alerts/download", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "alerts.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();

    } catch (err) {
      console.error("Download failed", err);
    }
  }}
>
  Download Alerts
</button>
        </div>
      </div>

      {loading ? (
        <div className="empty-state">Loading alerts...</div>
      ) : alerts.length === 0 ? (
        <div className="empty-state">No alerts available</div>
      ) : (
        <div className="alerts-grid">
          {alerts.map((alert) => (
            <div className="alert-card-pro" key={alert.id}>
              <div className="alert-card-top">
                <span className="alert-badge">
                  {alert.alert_type || "EMERGENCY"}
                </span>
                <span className="alert-time">
                  {alert.createdAt
                    ? new Date(alert.createdAt).toLocaleString()
                    : alert.created_at
                    ? new Date(alert.created_at).toLocaleString()
                    : "--"}
                </span>
              </div>

              <h3 className="alert-title">
                {alert.message || "Emergency Alert"}
              </h3>

              <div className="alert-info-grid">
                <div className="info-box">
                  <span className="info-label">Heart Rate</span>
                  <span className="info-value">
                    {alert.heart_rate ?? "--"} bpm
                  </span>
                </div>

                <div className="info-box">
                  <span className="info-label">SpO₂</span>
                  <span className="info-value">
                    {alert.spo2 ?? "--"} %
                  </span>
                </div>
              </div>

              <div className="location-preview-header">
                <span className="info-label">Location Preview</span>
                <span className="info-value">Device Location</span>
              </div>

              <a
                href={DEVICE_LOCATION_URL}
                target="_blank"
                rel="noreferrer"
                className="location-btn"
              >
                Open Device Location
              </a>

              <div className="mini-map-box">
                <iframe
                  title={`alert-map-${alert.id}`}
                  src="https://www.google.com/maps?q=10.027684,76.600315&output=embed"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Alerts;