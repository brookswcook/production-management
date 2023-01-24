import { Container, Grid } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Fragment, ReactElement } from "react";
import {
  PurchaseOrderListFieldsFragment,
  usePurchaseOrdersQuery,
} from "../../../generated/graphql";

export function PurchaseOrderList(): ReactElement {
  const { data, loading, error } = usePurchaseOrdersQuery({});
  const rows: PurchaseOrderListFieldsFragment[] = data?.purchaseOrders ?? [];

  const columns: GridColDef<PurchaseOrderListFieldsFragment>[] = [
    {
      field: "uid",
      headerName: "Uid",
      minWidth: 50,
      flex: 1,
      type: "number",
    },
    {
      field: "createdAt",
      headerName: "Date",
      minWidth: 70,
      flex: 1,
      type: "date",
      valueFormatter: params => {
        return new Date(params.value as string).toLocaleDateString();
      },
    },
    {
      field: "expectedDeliveryDate",
      headerName: "Delivery Date",
      minWidth: 70,
      flex: 1,
      type: "date",
      valueFormatter: params => {
        return new Date(params.value as string).toLocaleDateString();
      },
    },
  ];

  function CustomToolbar(): ReactElement {
    return (
      <Fragment>
        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarExport />
        </GridToolbarContainer>
      </Fragment>
    );
  }

  return (
    <Container maxWidth="xl">
      <Grid item xs={12}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={item => item.uid}
          pageSize={100}
          loading={loading}
          error={error}
          autoHeight
          rowsPerPageOptions={[10]}
          components={{
            Toolbar: CustomToolbar,
          }}
          disableSelectionOnClick
          sx={{ mt: 1 }}
        />
      </Grid>
    </Container>
  );
}
