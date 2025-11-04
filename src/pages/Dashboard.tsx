import React from "react";
import { EmployeeDashboard } from "../components/Employee";

export default function DashboardPage() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "var(--spacing-lg)" }}>
      <EmployeeDashboard />
    </div>
  );
}
