import { useEffect, useMemo, useState } from "react";
import type { Employee } from "../types/employee";

export default function useEmployees() {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    import("../mock-data/employees.json")
      .then((m) => {
        if (!mounted) return;
        // ✅ Access default export
        setData(m.default as unknown as Employee[]);
        setLoading(false);
      })
      .catch(() => {
        setData([]);
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const total = data.length;
    const active = data.filter((d) => d.isActive).length;
    const avgSalary = total
      ? Math.round(data.reduce((s, x) => s + x.salary, 0) / total)
      : 0;
    const byDepartment = data.reduce<Record<string, number>>((acc, cur) => {
      acc[cur.department] = (acc[cur.department] || 0) + 1;
      return acc;
    }, {});
    return { total, active, avgSalary, byDepartment };
  }, [data]);

  return { data, loading, stats };
}
