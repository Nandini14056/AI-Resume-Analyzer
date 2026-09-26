import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Eye, EyeOff, Mail, Lock, UserRound, Sparkles } from "lucide-react";
import "./Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors([]);

    if (password !== confirmPassword) {
      setErrors(["Passwords do not match"]);
      setLoading(false);
      return;
    }

    try {
       await api.post("/auth/register", {
        name,
        email,
        password
      });
        navigate("/");
     
    } catch (error) {
      setErrors([
        error.response?.data?.message ||"Registration failed",
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual__badge">
          <Sparkles size={16} />
          New account onboarding
        </div>
        <h1>Launch smarter resume reviews from day one.</h1>
        <p>Create a workspace that feels as polished as the analyses you deliver.</p>
        <div className="auth-visual__card">
          <div className="auth-visual__dot" />
          <div>
            <strong>Instant setup</strong>
            <p>Begin with premium dashboards, activity tracking, and actionable scoring.</p>
          </div>
        </div>
      </div>

      <div className="auth-card">
        <div className="logo">
          <Sparkles size={20} />
        </div>
        <h2>Create your account</h2>
        <p>Start optimizing every resume review with a modern workflow.</p>

        <form onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <div className="form-errors">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          <div className="input-group">
            <label>Full name</label>
            <div className="input-box">
              <UserRound className="icon" size={16} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email</label>
            <div className="input-box">
              <Mail className="icon" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
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
                placeholder="Create a password"
              />
              <button type="button" className="eye-btn" onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>Confirm password</label>
            <div className="input-box">
              <Lock className="icon" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
              />
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="bottom-text">
          Already have an account?
          <Link to="/">Log in</Link>
        </div>
      </div>
    </div>
  );
}