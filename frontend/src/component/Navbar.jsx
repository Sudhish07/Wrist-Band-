import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand-block">
          <div className="brand-logo">WB</div>
          <div>
            <h2 className="brand-title">Smart Wristband</h2>
            <p className="brand-subtitle">Safety Monitoring Dashboard</p>
          </div>
        </div>

        <nav className="nav-links">
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className={location.pathname === "/dashboard" ? "nav-link active" : "nav-link"}
              >
                Dashboard
              </Link>

              <Link
                to="/alerts"
                className={location.pathname === "/alerts" ? "nav-link active" : "nav-link"}
              >
                Alerts
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className={location.pathname === "/admin" ? "nav-link active" : "nav-link"}
                >
                  Admin Dashboard
                </Link>
              )}
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className={location.pathname === "/login" ? "nav-link active" : "nav-link"}
              >
                Login
              </Link>
              <Link
                to="/"
                className={location.pathname === "/" ? "nav-link active" : "nav-link"}
              >
                Sign Up
              </Link>
            </>
          )}

          {isAuthenticated && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;