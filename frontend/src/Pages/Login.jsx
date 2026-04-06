import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../service/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login: saveLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      if (!res.data || !res.data.token) {
        setError("Invalid login response from server");
        return;
      }

      saveLogin(
        res.data.token,
        res.data.user || null,
        res.data.expiresIn || 6 * 60 * 60 * 1000
      );

      if (res.data.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-head">
          <p className="section-tag">Welcome Back</p>
          <h2>Login to Dashboard</h2>
        </div>

        <form onSubmit={login}>
          {error && <p className="error-text">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="auth-link-text">
            Don’t have an account? <Link to="/">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;