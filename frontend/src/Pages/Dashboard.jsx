import { useEffect, useState } from "react";
import api from "../service/api";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth(); // ✅ Get logged-in user

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await api.get("/sensor/latest");

        if (!res.data || Object.keys(res.data).length === 0) {
          setNoData(true);
          setData(null);
        } else {
          setData(res.data);
          setNoData(false);
        }
      } catch (error) {
        console.error("Failed to fetch latest sensor data:", error);
        setNoData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
    const interval = setInterval(fetchLatest, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-wrap">
      <div className="hero-section">
        <div>
          <p className="section-tag">Live Monitoring</p>

          {/* ✅ UPDATED HERE */}
          <h1>
            Welcome {user?.name || "User"} 👋
          </h1>

          <p className="hero-text">
            Track heart rate, SpO₂, battery level, device status and emergency activity in one place.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="empty-state">Loading latest sensor data...</div>
      ) : noData ? (
        <div className="empty-state">No sensor data available</div>
      ) : (
        <>
          <div className="dashboard-grid">
            <div className="metric-card metric-primary">
              <p className="metric-label">Heart Rate</p>
              <h2>{data.heart_rate ?? "--"}</h2>
              <span>bpm</span>
            </div>

            <div className="metric-card metric-primary">
              <p className="metric-label">SpO₂</p>
              <h2>{data.spo2 ?? "--"}</h2>
              <span>%</span>
            </div>

            <div className="metric-card">
              <p className="metric-label">Status</p>
              <div className={`status-pill ${data.status === "OFFLINE" ? "offline" : ""}`}>
                {data.status || "NORMAL"}
              </div>
            </div>

            <div className="metric-card">
              <p className="metric-label">Mode</p>
              <h3>{data.mode || "ADULT"}</h3>
            </div>

            <div className="metric-card">
              <p className="metric-label">Battery</p>
              <h3>
                {data.battery_percent != null ? `${data.battery_percent}%` : "--"}
              </h3>
            </div>

            <div className="metric-card">
              <p className="metric-label">Battery Voltage</p>
              <h3>
                {data.battery_voltage != null ? `${data.battery_voltage} V` : "--"}
              </h3>
            </div>
          </div>

          <div className="info-panel">
            <div className="info-panel-card">
              <p className="metric-label">Last Updated</p>
              <h3>
                {data.createdAt
                  ? new Date(data.createdAt).toLocaleString()
                  : data.created_at
                  ? new Date(data.created_at).toLocaleString()
                  : "--"}
              </h3>
            </div>

            <div className="info-panel-card">
              <p className="metric-label">Device ID</p>
              <h3>{data.device_id || "WRIST-001"}</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;