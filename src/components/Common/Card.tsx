import React from "react";
import "../../styles/employee-dashboard.css"; // Ensure CSS is imported here

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
};

const Card: React.FC<Props> = ({ title, value, subtitle }) => {
  return (
    <div className="fw-summary-card">
      <div className="fw-summary-title">{title}</div>
      <div className="fw-summary-value">{value}</div>
      {subtitle && (
        <div className="fw-summary-title" style={{ marginTop: 6 }}>
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default React.memo(Card);
