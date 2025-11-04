import Card from "../Common/Card";
import "../../styles/employee-dashboard.css"; // ✅ Make sure CSS is imported

type Props = {
  total: number;
  active: number;
  avgSalary: number;
};

export default function EmployeeSummary({ total, active, avgSalary }: Props) {
  return (
    <div className="fw-summary-container">
      <Card title="Total Employees" value={total} />
      <Card title="Active Employees" value={active} />
      <Card title="Average Salary" value={`₹ ${avgSalary}`} />
    </div>
  );
}
