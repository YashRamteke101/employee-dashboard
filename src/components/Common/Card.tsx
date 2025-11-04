import React from "react";

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
};

const Card: React.FC<Props> = ({ title, value, subtitle }) => {
  return (
   <div style={{
  borderRadius: "var(--radius-base)",
  padding: "var(--spacing-md)",
  boxShadow: "var(--shadow-base)",
  background: "var(--color-surface)",
  minWidth: 180
}}>
  <div style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)" }}>{title}</div>
  <div style={{ fontSize: "24px", fontWeight: 600, marginTop:" var(--spacing-sm)", color: "var(--color-text)" }}>{value}</div>
  {subtitle && <div style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", marginTop: "var(--spacing-sm)" }}>{subtitle}</div>}
</div>

  );
};

export default React.memo(Card);
