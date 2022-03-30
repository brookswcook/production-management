import { Container, Grid } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
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
    { field: "name", headerName: "Title", minWidth: 120, flex: 3 },
    {
      field: "deliveryDate",
      headerName: "Delivery date",
      minWidth: 80,
      flex: 3,
      type: "date",
      valueFormatter: params => {
        return new Date(params.value as string).toLocaleDateString();
      },
    },
    {
      field: "dueIn",
      headerName: "Due in",
      minWidth: 70,
      flex: 2,
      valueFormatter: params => {
        return `${params.value as string} days`;
      },
    },
    {
      field: "onTime",
      headerName: "On time",
      flex: 2,
      type: "boolean",
    },
    {
      field: "techPackUploaded",
      headerName: "Tech pack",
      flex: 2,
      type: "boolean",
    },
    {
      field: "awaitingFabricSample",
      headerName: "Awaiting Fabric Sample",
      flex: 2,
      type: "boolean",
    },
    {
      field: "awaitingFitSample",
      headerName: "Awaiting Fit Sample",
      flex: 2,
      type: "boolean",
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolBarNewProductButton />
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
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
