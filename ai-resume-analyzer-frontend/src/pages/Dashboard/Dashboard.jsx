import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, BrainCircuit, FileText, Sparkles, TrendingUp } from "lucide-react";
import api from "../../services/api";
import "./Dashboard.css";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import RecentResume from "../../components/RecentResume/RecentResume";

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("index.php?page=dashboard_api");
        if (response.data.success) {
          setResumes(response.data.data);
        } else {
          setError("Failed to load dashboard data.");
        }
      } catch (err) {
        setError("Unable to connect to backend.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const totalResumes = resumes.length;
  const analyzedResumes = resumes.filter((resume) => resume.analysis_id).length;
  const averageAts = analyzedResumes > 0 ? Math.round(resumes.filter((resume) => resume.analysis_id).reduce((sum, resume) => sum + (resume.ats_score || 0), 0) / analyzedResumes) : 0;
  const recent = resumes.slice(0, 3);

  return (
    <div className="page-shell">
      <Sidebar />

      <main className="page-content">
        <Navbar />

        <motion.section className="hero panel" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div>
            <div className="hero__eyebrow">
              <Sparkles size={16} />
              Weekly briefing
            </div>
            <h1>Elevate every resume with AI-powered precision.</h1>
            <p>Track match quality, ATS readiness, and hiring signals from a single premium workspace.</p>
            <div className="hero__actions">
              <button className="btn btn-primary" onClick={() => navigate("/upload")}>Upload new resume</button>
              <button className="btn btn-secondary" onClick={() => navigate("/history")}>View reports</button>
            </div>
          </div>
        </motion.section>

        <section className="cards">
          <DashboardCard title="Total resumes" value={totalResumes} delta={`${analyzedResumes} analyzed`} color="#4f46e5" icon={FileText} />
          <DashboardCard title="Average ATS" value={`${averageAts}%`} delta="Calculated from analyzed resumes" color="#10b981" icon={BadgeCheck} />
          <DashboardCard title="Reports" value={analyzedResumes} delta="Ready to review" color="#f59e0b" icon={TrendingUp} />
        </section>

        <section className="content-grid">
          <div className="recent panel">
            <div className="section-heading">
              <div>
                <h2 className="section-title">Recent analyses</h2>
                <p className="section-subtitle">Latest candidate screening outcomes</p>
              </div>
              <button className="btn btn-secondary" onClick={() => navigate("/history")}>See all</button>
            </div>

            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="empty-state">{error}</div>
            ) : resumes.length === 0 ? (
              <div className="empty-state">No resumes uploaded yet.</div>
            ) : (
              recent.map((item) => (
                <RecentResume
                  key={item.id}
                  name={item.original_filename}
                  score={item.ats_score || 0}
                  status={item.analysis_id ? "Analyzed" : "Pending"}
                />
              ))
            )}
          </div>

          <div className="insight panel">
            <h2 className="section-title">This week</h2>
            <p className="section-subtitle">You’re closing the gap on missing keywords and ATS compatibility.</p>
            <div className="insight__meter">
              <div className="insight__ring" />
              <div>
                <strong>{analyzedResumes > 0 ? `${averageAts}%` : "--"}</strong>
                <p>Improved match rate</p>
              </div>
            </div>
            <ul className="insight__list">
              <li>Keyword coverage up 11%</li>
              <li>ATS readiness steady across roles</li>
              <li>Three resumes need stronger impact statements</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
