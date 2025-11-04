import React, { useMemo, useRef, useEffect } from "react";
import useEmployees from "../../hooks/useEmployees";
import EmployeeSummary from "./EmployeeSummary";
import DataGrid from "../DataGrid/DataGrid";
import type {
  ColDef,
  ICellRendererParams,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import type { AgGridReact } from "ag-grid-react";

export default function EmployeeDashboard() {
  const { data, loading, stats } = useEmployees();
  const gridRef = useRef<AgGridReact>(null);

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "firstName",
        headerName: "Employee Name",
        filter: "agTextColumnFilter",
        valueGetter: (params: ValueGetterParams) =>
          `${params.data.firstName} ${params.data.lastName}`,
        minWidth: 180,
        sortable: true,
        cellClass: "fw-cell-bold",
      },
      { field: "department", headerName: "Department", minWidth: 150 },
      { field: "position", headerName: "Position", minWidth: 180 },
      {
        field: "salary",
        headerName: "Salary",
        valueFormatter: (p: ValueFormatterParams) =>
          `₹ ${p.value?.toLocaleString()}`,
        type: "numberColumn",
        minWidth: 140,
        cellStyle: { textAlign: "right" },
      },
      {
        field: "hireDate",
        headerName: "Hire Date",
        valueFormatter: (p: ValueFormatterParams) =>
          new Date(p.value).toLocaleDateString(),
        minWidth: 140,
      },
      {
        field: "performanceRating",
        headerName: "Performance",
        minWidth: 140,
        cellStyle: { textAlign: "center" },
      },
      { field: "manager", headerName: "Manager", minWidth: 150 },
      {
        headerName: "Status",
        field: "isActive",
        pinned: "right",
        minWidth: 140,
        cellRenderer: (params: ICellRendererParams) => (
          <span
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              backgroundColor:
                params.value === true ? "#D1FAE5" : "#FECACA",
              color: params.value === true ? "#065F46" : "#7F1D1D",
              fontWeight: 600,
              fontSize: "13px",
            }}
          >
            {params.value ? "Active" : "Inactive"}
          </span>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    if (loading) gridRef.current?.api?.showLoadingOverlay();
    else if (!data?.length) gridRef.current?.api?.showNoRowsOverlay();
    else gridRef.current?.api?.hideOverlay();
  }, [loading, data]);

  return (
    <div className="employee-dashboard">
      <EmployeeSummary
        total={stats.total}
        active={stats.active}
        avgSalary={stats.avgSalary}
      />

      <div className="ag-theme-quartz fw-grid-container">
        <DataGrid
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={data}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
}
