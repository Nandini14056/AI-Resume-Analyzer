import { motion } from "framer-motion";
import { BarChart3, ShieldCheck, Users, Sparkles } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Admin.css";

const adminCards = [
  { title: "Active users", value: "128", icon: Users },
  { title: "Monitoring", value: "24/7", icon: ShieldCheck },
  { title: "Reports", value: "86", icon: BarChart3 },
];

export default function Admin() {
  return (
    <div className="page-shell">
      <Sidebar />

      <main className="page-content">
        <Navbar />

        <motion.section className="panel admin-panel" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="section-heading">
            <div>
              <h2 className="section-title">Admin overview</h2>
              <p className="section-subtitle">Keep the workspace healthy and your review pipeline running smoothly.</p>
            </div>
            <button className="btn btn-primary">Run audit</button>
          </div>

          <div className="cards">
            {adminCards.map((card) => {
              const Icon = card.icon;
              return (
                <div className="stat-card panel" key={card.title}>
                  <div className="stat-card__top">
                    <p>{card.title}</p>
                    <Icon size={18} color="#4f46e5" />
                  </div>
                  <h3>{card.value}</h3>
                </div>
              );
            })}
          </div>

          <div className="admin-hero">
            <div>
              <div className="hero__eyebrow">
                <Sparkles size={16} />
                Operational health
              </div>
              <h3>Everything is running at premium speed.</h3>
              <p>Uploads, reports, and feedback loops remain fully connected to the existing backend services.</p>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
