import "./DashboardCard.css";

export default function DashboardCard({ title, value, delta, color, icon: Icon }) {
  return (
    <div className="stat-card panel" style={{ borderTop: `4px solid ${color}` }}>
      <div className="stat-card__top">
        <p>{title}</p>
        {Icon ? <Icon size={18} color={color} /> : null}
      </div>
      <h3>{value}</h3>
      {delta ? <span className="stat-card__delta">{delta}</span> : null}
    </div>
  );
}