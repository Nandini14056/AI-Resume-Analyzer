import { useLocation } from "react-router-dom";
import { Bell, Search, Sparkles, ChevronDown } from "lucide-react";
import "./Navbar.css";

const titles = {
  "/dashboard": "Overview",
  "/upload": "Resume upload",
  "/report": "Analysis report",
  "/history": "History",
  "/admin": "Admin",
};

export default function Navbar() {
  const location = useLocation();
 
  const title = titles[location.pathname] || "Workspace";



  return (
    <header className="topbar panel">
      <div className="topbar__left">
        <div className="topbar__pill">
          <Sparkles size={16} />
          AI Resume OS
        </div>
        <div>
          <p className="topbar__eyebrow">Operations</p>
          <h2>{title}</h2>
        </div>
      </div>

      <div className="topbar__actions">
        <label className="topbar__search">
          <Search size={16} />
          <input type="search" placeholder="Search insights" />
        </label>
        <button className="topbar__icon" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <div className="topbar__profile">
          <div className="avatar">N</div>
          <div>
            <strong>Nandini</strong>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}