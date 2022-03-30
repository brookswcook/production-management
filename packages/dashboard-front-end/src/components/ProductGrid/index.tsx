import { Container, Grid } from "@mui/material";
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
import GridToolBarNewProductButton from "../GridToolbarNewProductButton";

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
    {
      field: "onTime",
      headerName: "On time",
      flex: 50,
      type: "boolean",
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolBarNewProductButton />
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
          pageSize={10}
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
