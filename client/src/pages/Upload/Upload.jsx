import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import api from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Upload.css";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      setStatus("Please select a resume file first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    setProgress(0);

    try {
      setStatus("Uploading resume...");

      const uploadResponse = await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (event.total) {
            setProgress(Math.round((event.loaded * 100) / event.total));
          }
        },
      });

      const resume = uploadResponse.data.data.resume;

      setStatus("Resume uploaded successfully.");
      setProgress(100);
      setStatus("Analyzing resume with AI...");
      const analysisResponse = await api.post(`/analysis/${resume._id}`);

      const analysis = analysisResponse.data.data.analysis;

      setStatus("Analysis completed successfully!");

      setTimeout(() => {
        navigate(`/report/${analysis._id}`);
      }, 800);
    } catch (error) {
      setStatus(
        error.response?.data?.error || "Upload failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <Sidebar />

      <main className="page-content">
        <Navbar />

        <motion.section
          className="upload-grid"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="panel upload-panel">
            <div className="section-heading">
              <div>
                <h2 className="section-title">Upload resume</h2>
                <p className="section-subtitle">
                  Drop a document and let the AI begin the analysis.
                </p>
              </div>
              <button
                className="btn btn-secondary"
                onClick={() => inputRef.current?.click()}
              >
                Select file
              </button>
            </div>

            <div
              className="upload-zone"
              onClick={() => inputRef.current?.click()}
            >
              <div className="upload-zone__icon">
                <FileText size={28} />
              </div>
              <h3>{file ? file.name : "Drag and drop your resume"}</h3>
              <p>
                PDF and DOCX files supported. Your file stays secure and
                private.
              </p>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.docx"
                className="hidden-input"
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubmit();
                }}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload resume"}{" "}
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="upload-progress">
              <div className="upload-progress__bar">
                <div style={{ width: `${progress}%` }} />
              </div>
              <div className="upload-progress__labels">
                <span>{status || "No upload started yet."}</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>

          <div className="panel upload-side">
            <div className="upload-side__item">
              <div className="upload-side__icon">
                <ShieldCheck size={18} />
              </div>
              <div>
                <strong>Secure processing</strong>
                <p>Encrypted upload and analysis flow.</p>
              </div>
            </div>

            <div className="upload-side__item">
              <div className="upload-side__icon accent">
                <Sparkles size={18} />
              </div>
              <div>
                <strong>AI recommendations</strong>
                <p>Actionable feedback on alignment and ATS readiness.</p>
              </div>
            </div>

            <div className="upload-side__item">
              <div className="upload-side__icon success">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <strong>Instant preview</strong>
                <p>Review scorecards once processing completes.</p>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
