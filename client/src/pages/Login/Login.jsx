import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Login.css";
import { Eye, EyeOff, Mail, Lock, Sparkles } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors([]);

    try {
      const response = await api.post("/auth/login", { email, password });

      localStorage.setItem(
        "accessToken",
        response.data.data.accessToken
      );

        navigate("/dashboard");
    
    } catch (error) {
      setErrors(error.response?.data?.errors || ["Login failed. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual__badge">
          <Sparkles size={16} />
          AI resume intelligence
        </div>
        <h1>Make every application more compelling.</h1>
        <p>Review ATS readiness, uncover missing keywords, and turn raw resumes into polished hiring insights.</p>
        <div className="auth-visual__card">
          <div className="auth-visual__dot" />
          <div>
            <strong>92% match quality</strong>
            <p>Real-time scoring and recommendations ready in seconds.</p>
          </div>
        </div>
      </div>

      <div className="auth-card">
        <div className="logo">
          <Sparkles size={20} />
        </div>
        <h2>Welcome back</h2>
        <p>Sign in to continue your hiring workflow.</p>

        <form onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <div className="form-errors">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          <div className="input-group">
            <label>Email</label>
            <div className="input-box">
              <Mail className="icon" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-box">
              <Lock className="icon" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              <button type="button" className="eye-btn" onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="bottom-text">
          Don’t have an account?
          <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  );
}