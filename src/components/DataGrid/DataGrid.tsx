import { forwardRef, useMemo } from "react";
import {AllCommunityModule, ClientSideRowModelApiModule, ClientSideRowModelModule, type ColDef, ModuleRegistry, NumberFilterModule, PaginationModule, TextEditorModule, TextFilterModule, themeQuartz, ValidationModule, type ValueFormatterParams} from 'ag-grid-community';



import {AllEnterpriseModule, MasterDetailModule, RowGroupingModule, ServerSideRowModelModule, SideBarModule} from 'ag-grid-enterprise';


import { AgGridReact, type AgGridReactProps } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

export type CustomColDef = ColDef & { formatter?: (params: ValueFormatterParams) => string | number };


 ModuleRegistry.registerModules([
    AllCommunityModule,
    SideBarModule,  
    ServerSideRowModelModule,
    ValidationModule,
    AllEnterpriseModule,
    MasterDetailModule,
    RowGroupingModule,
    TextFilterModule,
    TextEditorModule,
    NumberFilterModule,
    ClientSideRowModelModule,
    ClientSideRowModelApiModule,
    PaginationModule, 
  ]);



const DataGrid = forwardRef<AgGridReact, AgGridReactProps>(({ columnDefs, ...rest }, ref) => {
    const defaultColDef = useMemo(
        () => ({
            flex: 1,
            minWidth: 150,
            sortable: true,
            filter: true,
            resizable: true,
            suppressMovable: false,
            wrapHeaderText: true,
            autoHeaderHeight: true,
            wrapText         : true,
            floatingFilter: true,
        }),
        []
    );

    return (
       <div style={{ height: "100%", display: "flex", flexDirection: "column"  }}>
            <AgGridReact
                ref={ref}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[5,10, 20]}
                animateRows={true}
                enableCellTextSelection={true}
                sideBar={true}
                columnMenu='legacy'
                theme={themeQuartz}
                className='ag-theme-alpine'
                domLayout="autoHeight"
                {...rest}
            />
        </div>

    );
});

DataGrid.displayName = "DataGrid";
export default DataGrid;
