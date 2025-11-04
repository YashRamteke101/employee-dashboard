import React from "react";

export default function Header() {
  return (
   <header style={{
  height: "64px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `0 var(--spacing-lg)`,
  background: `var(--color-surface)`,
  borderBottom: `1px solid var(--color-border)`,
}}>
  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "var(--font-size-large)", color: "var(--color-text)" }}>
    FactWise Dashboard
  </div>
  <div style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-secondary)' }}>
    v0.1
  </div>
</header>
  );
}
