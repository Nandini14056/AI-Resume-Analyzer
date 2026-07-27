import { Link, useLocation } from "react-router-dom";
import { Home, UploadCloud, BarChart3, History, ShieldCheck, Sparkles } from "lucide-react";
import "./Sidebar.css";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/upload", label: "Upload Resume", icon: UploadCloud },
  { to: "/report/1", label: "Reports", icon: BarChart3 },
  { to: "/history", label: "History", icon: History },
  { to: "/admin", label: "Admin", icon: ShieldCheck },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__icon">
          <Sparkles size={18} />
        </div>
        <div>
          <strong>ResumeAI</strong>
          <p>Premium analytics</p>
        </div>
      </div>

      <nav className="sidebar__nav">
        {links.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to || location.pathname.startsWith(to);
          return (
            <Link key={to} to={to} className={`sidebar__item ${active ? "active" : ""}`}>
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <p>AI screening</p>
        <strong>Always on</strong>
      </div>
    </aside>
  );
}