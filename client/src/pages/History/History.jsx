import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight } from "lucide-react";
import api from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./History.css";

export default function History() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await api.get("index.php?page=history_api");
        if (response.data.success) {
          setResumes(response.data.data);
        } else {
          setError("Failed to load history.");
        }
      } catch (err) {
        setError("Unable to connect to backend.");
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  return (
    <div className="page-shell">
      <Sidebar />

      <main className="page-content">
        <Navbar />

        <motion.section className="panel history-panel" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="section-heading">
            <div>
              <h2 className="section-title">Analysis history</h2>
              <p className="section-subtitle">A polished record of every review workflow.</p>
            </div>
            <button className="btn btn-primary">Export history</button>
          </div>

          <div className="history-toolbar">
            <label className="history-search">
              <Search size={16} />
              <input type="search" placeholder="Search resumes" />
            </label>
            <button className="history-filter">
              <Filter size={16} />
              Filter
            </button>
          </div>

          <div className="history-table">
            <div className="history-table__head">
              <span>Resume</span>
              <span>Date</span>
              <span>Status</span>
              <span>Score</span>
              <span />
            </div>

            {loading ? (
              <div className="empty-state">Loading history...</div>
            ) : error ? (
              <div className="empty-state">{error}</div>
            ) : resumes.length === 0 ? (
              <div className="empty-state">No resume history available yet.</div>
            ) : (
              resumes.map((item) => (
                <div className="history-table__row" key={item.id}>
                  <strong>{item.original_filename}</strong>
                  <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  <span className={`history-badge ${item.status.toLowerCase()}`}>{item.status}</span>
                  <strong>{item.ats_score || 0}%</strong>
                  <button className="history-action" onClick={() => item.analysis_id && navigate(`/report/${item.analysis_id}`)}>
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
