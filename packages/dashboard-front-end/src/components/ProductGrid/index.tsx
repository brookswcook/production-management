import { Button, Container, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  DataGrid,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useProductsQuery } from "../../generated/graphql";

export default function ProductGrid() {
  const { data, loading, error } = useProductsQuery({
    variables: {},
  });

  const rows = data ? data.products : [];
  const columns: GridColDef[] = [
    { field: "name", headerName: "Title", flex: 150 },
    {
      field: "deliveryDate",
      headerName: "Delivery date",
      flex: 150,
      type: "date",
      valueFormatter: params => {
        return new Date(params.value as string).toLocaleDateString();
      },
    },
    {
      field: "dueIn",
      headerName: "Due in",
      flex: 100,
      valueFormatter: params => {
        return `${params.value as string} days`;
      },
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button variant="text" size="small" onClick={() => {}}>
          <AddIcon />
          New Product
        </Button>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <Container maxWidth="xl">
      <Grid item xs={12}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={item => item.name as string}
          pageSize={5}
          loading={loading}
          error={error}
          autoHeight
          rowsPerPageOptions={[5]}
          components={{
            Toolbar: CustomToolbar,
          }}
          checkboxSelection
          disableSelectionOnClick
        />
      </Grid>
    </Container>
  );
}
