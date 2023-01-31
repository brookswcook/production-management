import { Container, Grid } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Fragment, ReactElement } from "react";
import { Link } from "react-router-dom";
import {
  PurchaseOrderListFieldsFragment,
  usePurchaseOrdersQuery,
} from "../../../generated/graphql";
import RequireRole from "../../Auth/RequireRole";
import { CreatePurchaseOrderPopperButton } from "../Form";

export function PurchaseOrderList(): ReactElement {
  const { data, loading, error } = usePurchaseOrdersQuery({});
  const rows: PurchaseOrderListFieldsFragment[] = data?.purchaseOrders ?? [];

  const columns: GridColDef<PurchaseOrderListFieldsFragment>[] = [
    {
      field: "uid",
      headerName: "#",
      minWidth: 50,
      flex: 1,
      type: "number",
      headerAlign: "left",
      align: "left",
      renderCell({ id, formattedValue }: GridRenderCellParams) {
        const linkPath = `/purchase-orders/${id}`;
        const linkText = `${formattedValue as string}`;
        return (
          <Link to={linkPath} style={{ textDecoration: "none" }}>
            {linkText}
          </Link>
        );
      },
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
      field: "status",
      headerName: "status",
      minWidth: 70,
      flex: 2,
      type: "string",
      valueGetter: ({ row }: { row: PurchaseOrderListFieldsFragment }) => {
        return row.status;
      },
    },
    {
      field: "factoryName",
      headerName: "Factory",
      minWidth: 70,
      flex: 2,
      type: "string",
      valueGetter: ({ row }: { row: PurchaseOrderListFieldsFragment }) => {
        return row.factory.name;
      },
    },
    {
      field: "companyName",
      headerName: "Company",
      minWidth: 70,
      flex: 2,
      type: "string",
      valueGetter: ({ row }: { row: PurchaseOrderListFieldsFragment }) => {
        return row.company.name;
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

  function CustomToolbar() {
    return (
      <Fragment>
        <GridToolbarContainer>
          <RequireRole authorizedRoles={["Admin", "VChapman"]}>
            <CreatePurchaseOrderPopperButton />
          </RequireRole>
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
