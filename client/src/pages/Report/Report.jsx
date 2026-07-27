import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, Sparkles, TrendingUp, CircleCheckBig, ArrowRight } from "lucide-react";
import api from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Report.css";

export default function Report() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await api.get(`index.php?page=report_api&analysis_id=${id}`);
        if (response.data.success) {
          setReport(response.data.data);
        } else {
          setError(response.data.error || "Failed to load report.");
        }
      } catch (err) {
        setError("Unable to connect to backend.");
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [id]);

  const score = report?.ats_score ?? 0;
  const recommendations = report?.recommendations ?? [];
  const strengths = report?.strengths ?? [];
  const weaknesses = report?.weaknesses ?? [];

  return (
    <div className="page-shell">
      <Sidebar />

      <main className="page-content">
        <Navbar />

        <motion.section className="report-grid" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="panel report-overview">
            <div className="section-heading">
              <div>
                <h2 className="section-title">Analysis report</h2>
                <p className="section-subtitle">Detailed scorecard for the selected resume.</p>
              </div>
              <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
            </div>

            {loading ? (
              <div>Loading report...</div>
            ) : error ? (
              <div className="empty-state">{error}</div>
            ) : (
              <>
                <div className="score-card">
                  <div className="score-card__ring">
                    <strong>{score}</strong>
                    <span>/100</span>
                  </div>
                  <div>
                    <h3>{score >= 80 ? "Strong overall profile" : "Resume needs improvement"}</h3>
                    <p>{report.raw_response ? "AI analysis is available below." : "No analysis details available."}</p>
                  </div>
                </div>

                <div className="metric-list">
                  {[
                    { label: "ATS compatibility", value: report.ats_score, color: "#4f46e5" },
                    { label: "Job readiness", value: report.job_readiness_score, color: "#3b82f6" },
                  ].map((item) => (
                    <div key={item.label} className="metric-item">
                      <div className="metric-item__top">
                        <span>{item.label}</span>
                        <strong>{item.value}%</strong>
                      </div>
                      <div className="metric-item__bar">
                        <div style={{ width: `${item.value}%`, background: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="panel report-side">
            <div className="report-side__card">
              <div className="report-side__icon">
                <Sparkles size={18} />
              </div>
              <div>
                <strong>AI recommendations</strong>
                <ul className="report-list">
                  {recommendations.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="report-side__card">
              <div className="report-side__icon accent">
                <BarChart3 size={18} />
              </div>
              <div>
                <strong>Strengths</strong>
                <ul className="report-list">
                  {strengths.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="report-side__card">
              <div className="report-side__icon success">
                <CircleCheckBig size={18} />
              </div>
              <div>
                <strong>Weaknesses</strong>
                <ul className="report-list">
                  {weaknesses.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="panel report-insights">
          <div className="section-heading">
            <div>
              <h2 className="section-title">Growth opportunities</h2>
              <p className="section-subtitle">Suggested improvements for a stronger submission.</p>
            </div>
            <div className="pill">
              <TrendingUp size={16} />
              +12% expected uplift
            </div>
          </div>

          <div className="insight-cards">
            <div className="insight-card">
              <h3>Recommended actions</h3>
              <p>Use the items above to refine the resume for clearer impact and ATS compatibility.</p>
            </div>
            <div className="insight-card">
              <h3>Next step</h3>
              <p>Return to upload and submit another resume once you’ve incorporated the suggested changes.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
