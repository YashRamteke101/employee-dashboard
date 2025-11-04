import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmployees from "../../hooks/useEmployees";
import EmployeeSummary from "./EmployeeSummary";
import DataGrid from "../DataGrid/DataGrid";
import {
  type ColDef,
  type ICellRendererParams,
  type IRowNode,
  type SelectionChangedEvent,
  type ValueFormatterParams,
  type ValueGetterParams,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import type { AgGridReact } from "ag-grid-react";
import "../../styles/employee-dashboard.css";


const departmentColor = (dept: string) => {
  const colors: Record<string, string> = {
    Engineering: "#2563eb",
    HR: "#7e22ce",
    Design: "#db2777",
    Finance: "#059669",
    Sales: "#d97706",
    Marketing: "#9333ea",
    Product: "#4f46e5",
    Support: "#0284c7",
    Legal: "#334155",
  };
  return colors[dept] || "#475569";
};

export default function EmployeeDashboard() {
  const { data, loading, stats } = useEmployees();
  const [exportCsv, setExportCsv] = useState(false);
  const gridRef = useRef<AgGridReact>(null);
  const [selectedRows, setSelectedRows] = useState<IRowNode[]>([]);

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
      {
        field: "department",
        minWidth: 140,
        filter: "agTextColumnFilter",
        cellRenderer: (params: ICellRendererParams) => (
          <span
            className="fw-badge"
            style={{ backgroundColor: departmentColor(params.value) }}
          >
            {params.value}
          </span>
        ),
      },
      {
        field: "position",
        headerName: "Position",
        filter: "agTextColumnFilter",
        minWidth: 180
      },
      {
        field: "salary",
        headerName: "Salary",
        filter: "agNumberColumnFilter",
        valueFormatter: (p: ValueFormatterParams) =>
          `₹ ${p.value?.toLocaleString()}`,
        type: "numberColumn",
        minWidth: 140,
        cellStyle: { textAlign: "right" },
      },
      {
        field: "hireDate",
        headerName: "Hire Date",
        filter: "agDateColumnFilter",
        valueFormatter: (p: ValueFormatterParams) =>
          new Date(p.value).toLocaleDateString(),
        minWidth: 140,
      },
      {
        field: "performanceRating",
        headerName: "Performance",
        filter: "agNumberColumnFilter",
        minWidth: 150,
        cellRenderer: (params: ICellRendererParams) => {
          const rating = Number(params.value) || 0;
          const maxStars = 5;
          const filled = "★".repeat(rating);
          const empty = "☆".repeat(maxStars - rating);

          return (
            <span className="fw-stars" title={`${rating} / ${maxStars}`}>
              <span className="fw-star-filled">{filled}</span>
              <span className="fw-star-empty">{empty}</span>
            </span>
          );
        },
        cellStyle: { textAlign: "center" },
      },
      {
        field: "manager",
        filter: "agTextColumnFilter",
        headerName: "Manager",
        minWidth: 150
      },
      {
        headerName: "Status",
        field: "isActive",
        pinned: "right",
        cellStyle: { textAlign: "center" },
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
    if (exportCsv) {
      gridRef?.current?.api.exportDataAsCsv({
        onlySelected: true,
      });
      setExportCsv?.(false);
    }
  }, [exportCsv, setExportCsv]);

  const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
    if (event?.api?.getSelectedNodes()) {
      setSelectedRows(event?.api?.getSelectedNodes());
    }
  }, []);



  return (
    <div className="employee-dashboard">
      <EmployeeSummary
        total={stats.total}
        active={stats.active}
        avgSalary={stats.avgSalary}
      />

      <button
        className="fw-btn-primary"
        disabled={selectedRows?.length === 0}
        onClick={() => setExportCsv(true)}
      >
        Export CSV 📤
      </button>
      <div className="ag-theme-quartz fw-grid-container">
        <DataGrid
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={data}
          domLayout="autoHeight"
          loading={loading}
          noRowsOverlayComponent="fw-no-rows-overlay"
          onSelectionChanged={onSelectionChanged}
          rowSelection={{ mode: 'multiRow', checkboxes: true, headerCheckbox: true ,}}
        />
      </div>
    </div>
  );
}
