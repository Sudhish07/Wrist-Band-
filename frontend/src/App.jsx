import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import MapPage from "./Pages/MapPage"
import Alerts from "./Pages/Alert"
import Navbar from "./component/Navbar"
import "./style.css"


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
