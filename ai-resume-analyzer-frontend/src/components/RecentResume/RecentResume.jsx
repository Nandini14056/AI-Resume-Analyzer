import "./RecentResume.css";

export default function RecentResume({ name, score, status }) {
  return (
    <div className="resume-item">
      <div>
        <strong>{name}</strong>
        <p>{status}</p>
      </div>
      <div className="resume-item__score">
        <span>{score}%</span>
        <div className="resume-item__bar">
          <div style={{ width: `${score}%` }} />
        </div>
      </div>
    </div>
  );
}