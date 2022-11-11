import { Container, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FabricFieldsFragment, useFabricsQuery } from "../../generated/graphql";

export default function FabricGrid() {
  const { data, loading, error } = useFabricsQuery({});
  const rows: FabricFieldsFragment[] = data?.fabrics ?? [];

  const columns: GridColDef<FabricFieldsFragment>[] = [
    {
      field: "code",
      headerName: "Code",
    },
    {
      field: "colorName",
      headerName: "Color Name",
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
          checkboxSelection
          disableSelectionOnClick
          sx={{ mt: 1 }}
        />
      </Grid>
    </Container>
  );
}
