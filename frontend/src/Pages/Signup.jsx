import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../service/api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const signup = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/signup", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
      });

      // ✅ Redirect to login (NO auto login)
      navigate("/login");

    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-head">
          <p className="section-tag">Create Account</p>
          <h2>Start Monitoring</h2>
        </div>

        <form onSubmit={signup}>
          {error && <p className="error-text">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>

          <p className="auth-link-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;