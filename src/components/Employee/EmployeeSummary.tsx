import React from "react";
import Card from "../Common/Card";

type Props = {
    total: number;
    active: number;
    avgSalary: number;
};

export default function EmployeeSummary({ total, active, avgSalary }: Props) {
    return (
        <div style={{
            display: "flex",
            gap: "var(--spacing-md)",
            flexWrap: "wrap",
            marginBottom: "var(--spacing-lg)"
        }}>
            <Card title="Total Employees" value={total} />
            <Card title="Active Employees" value={active} />
            <Card title="Average Salary" value={`₹ ${avgSalary}`} />
        </div>
    );
}
