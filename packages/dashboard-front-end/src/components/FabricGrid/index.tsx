import { Container, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FabricFieldsFragment, useFabricsQuery } from "../../generated/graphql";

export default function FabricGrid() {
  const { data, loading, error } = useFabricsQuery({});
  const rows: FabricFieldsFragment[] = data?.fabrics ?? [];

  const columns: GridColDef<FabricFieldsFragment>[] = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 70,
      flex: 1,
      type: "string",
    },
    {
      field: "code",
      headerName: "Code",
      minWidth: 50,
      flex: 1,
      type: "string",
    },
    {
      field: "colorName",
      headerName: "Color Name",
      minWidth: 120,
      flex: 3,
      type: "string",
    },
  ];

  return (
    <Container>
      <Grid item xs={12}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={item => item.code}
          pageSize={100}
          loading={loading}
          error={error}
          autoHeight
          disableSelectionOnClick
          sx={{ mt: 1 }}
        />
      </Grid>
    </Container>
  );
}
