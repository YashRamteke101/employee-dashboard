import { EmployeeDashboard } from "../components/Employee";
import "../styles/employee-dashboard.css";

export default function DashboardPage() {
  return (
    <div className="fw-page-layout">
      <EmployeeDashboard />
    </div>
  );
}
