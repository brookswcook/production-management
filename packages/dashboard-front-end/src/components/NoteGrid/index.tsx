import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Note } from "../../generated/graphql";

export default function NoteGrid({ notes: rows }: { notes: Note[] }) {
  const columns: GridColDef[] = [
    { field: "text", headerName: "Text", type: "string", flex: 2 },
    { field: "user", headerName: "User", type: "string", flex: 2 },
    { field: "createdAt", headerName: "CreatedAt", type: "date", flex: 2 },
  ];

  return (
    <Box sx={{ height: "400px", width: "100%", pt: 1 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
  );
}
