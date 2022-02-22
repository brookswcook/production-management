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
    { field: "name", headerName: "Title", width: 150 },
    {
      field: "deliveryDate",
      headerName: "Delivery date",
      width: 200,
      type: "date",
      valueFormatter: params => {
        return new Date(params.value as string).toLocaleDateString();
      },
    },
    {
      field: "dueIn",
      headerName: "Due in",
      width: 100,
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Button variant="text" size="small" onClick={() => {}}>
          <AddIcon />
          New Product
        </Button>
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
