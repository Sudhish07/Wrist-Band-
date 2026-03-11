import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">Dashboard</Link>
      <Link to="/map">Location</Link>
      <Link to="/alerts">Alerts</Link>
    </div>
  )
}

export default Navbar
