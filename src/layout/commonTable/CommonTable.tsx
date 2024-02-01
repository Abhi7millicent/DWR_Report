// CommonMaterialTable.tsx
import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

interface CommonMaterialTableProps {
  tableHead: MRT_ColumnDef<any>[]; // Adjust the type based on your data structure
  tableBody: any[]; // Adjust the type based on your data structure
}

const CommonMaterialTable: React.FC<CommonMaterialTableProps> = ({
  tableHead,
  tableBody,
}) => {
  // Memoize columns to make it stable
  const columns = useMemo(() => tableHead, [tableHead]);

  // Memoize data to make it stable
  const data = useMemo(() => tableBody, [tableBody]);

  const table = useMaterialReactTable({
    columns,
    data,
    muiTablePaperProps: {
      sx: {
        paddingRight: "20px !important",
        paddingLeft: "20px !important",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        minWidth: "max-content !important",
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default CommonMaterialTable;
