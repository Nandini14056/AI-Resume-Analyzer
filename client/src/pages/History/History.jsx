import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight, Trash2 } from "lucide-react";
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
        const [resumeResponse, analysisResponse] = await Promise.all([
          api.get("/resume"),
          api.get("/analysis"),
        ]);

        const resumes = resumeResponse.data.data || [];
        const analyses = analysisResponse.data.data || [];

        const history = resumes.map((resume) => {
          const analysis = analyses.find(
            (item) =>
              item.resume === resume._id || item.resume?._id === resume._id,
          );

          return {
            ...resume,
            analysis,
          };
        });
        setResumes(history);
      } catch (err) {
        console.log(err);
        setError("Unable to load history.");
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

        <motion.section
          className="panel history-panel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="section-heading">
            <div>
              <h2 className="section-title">Analysis history</h2>
              <p className="section-subtitle">
                A polished record of every review workflow.
              </p>
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
              <div className="empty-state">
                No resume history available yet.
              </div>
            ) : (
              resumes.map((item) => (
                <div className="history-table__row" key={item._id}>
                  <strong>{item.originalFilename}</strong>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  <span
                    className={`history-badge ${item.status.toLowerCase()}`}
                  >
                    {item.analysis ? "Analyzed" : "Pending"}
                  </span>
                  <strong>{item.atsScore || 0}%</strong>
                  <button
                    className="history-action"
                    onClick={() =>
                      item.analysis && navigate(`/report/${item.analysis_id}`)
                    }
                  >
                    <ArrowRight size={16} />
                  </button>
                  <button
                    className="history-delete"
                    onClick={async () => {
                      if (!window.confirm("Delete this resume?")) return;

                      try {
                        if (item.analysis) {
                          await api.delete(
                            `/analysis/delete/${item.analysis._id}`,
                          );
                        }

                        await api.delete(`/resume/${item._id}`);

                        setResumes((prev) =>
                          prev.filter((resume) => resume._id !== item._id),
                        );
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                  >
                    <Trash2 size={16} />
                    Delete
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
