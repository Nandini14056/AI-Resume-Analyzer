import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  UploadCloud,
  History,
  Sparkles,
  LogOut,
} from "lucide-react";
import "./Sidebar.css";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/upload", label: "Upload Resume", icon: UploadCloud },
  { to: "/history", label: "History", icon: History },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");

    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__icon">
          <Sparkles size={18} />
        </div>
        <div>
          <strong>ResumeAI</strong>
        </div>
      </div>

      <nav className="sidebar__nav">
        {links.map(({ to, label, icon: Icon }) => {
          const active =
            location.pathname === to || location.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`sidebar__item ${active ? "active" : ""}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <div className="logout-content">
            <span>Log out</span>
            <small>Sign out of your account</small>
          </div>
        </button>
      </div>
    </aside>
  );
}
