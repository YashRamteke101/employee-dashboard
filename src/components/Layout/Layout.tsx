import React from "react";
import Header from "./Header";
import "../../styles/layout.css"; // ✅ Ensure this is imported

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="fw-layout">
      <Header />
      <div className="fw-content-wrapper">
        <main className="fw-main-content">{children}</main>
      </div>
    </div>
  );
}
