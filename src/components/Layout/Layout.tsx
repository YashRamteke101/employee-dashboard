import React from "react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div style={{
  height: "100vh",
  display: "flex",
  flexDirection: "column"
}}>
  <Header />
  <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
    
    <main style={{
      padding: "var(--spacing-lg)",
      overflowY: "auto",
      flex: 1,
      background: "var(--color-bg)"
    }}>
      {children}
    </main>
  </div>
</div>
  );
}
