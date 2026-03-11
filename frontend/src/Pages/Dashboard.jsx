import { useEffect, useState } from "react"
import axios from "axios"

function Dashboard() {
  const [data, setData] = useState({})

  useEffect(() => {
    axios
      .get("http://localhost:5000/sensor/latest")
      .then((res) => setData(res.data))
  }, [])

  return (
    <div className="container">
      <h1>Smart Wristband Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h2>Heart Rate</h2>
          <p>{data.heart_rate} bpm</p>
        </div>

        <div className="card">
          <h2>SpO2</h2>
          <p>{data.spo2}%</p>
        </div>

        <div className="card">
          <h2>Status</h2>
          <p>{data.status}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
