import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Sample } from "../../generated/graphql";

export default function SampleGrid({
  samples: rows,
}: {
  samples: Omit<Sample, "typename">[] | undefined | null;
}) {
  const columns: GridColDef[] = [
    { field: "sku", headerName: "SKU", type: "string", flex: 2 },
    {
      field: "trackNumber",
      headerName: "Track Number",
      type: "string",
      flex: 2,
    },
    { field: "delivered", headerName: "Delivered", type: "boolean", flex: 1 },
    { field: "approved", headerName: "Approved", type: "boolean", flex: 1 },
  ];

  return (
    <Box sx={{ height: "200px", width: "100%" }}>
      <DataGrid
        rows={rows ?? []}
        columns={columns}
        pageSize={5}
        getRowId={item => item.sku as string}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
  );
}
