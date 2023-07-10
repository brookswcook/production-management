import { Button, capitalize } from "@mui/material";
import {
  GridColDef,
  GridRenderCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import {
  PurchaseOrderListFieldsFragment,
  usePurchaseOrdersQuery,
} from "../../../generated/graphql";
import RequireRole from "../../Auth/RequireRole";
import { ListView } from "../../ListView";
import CreatePurchaseOrderDialog from "../Dialog/CreatePurchaseOrderDialog";

export default function PurchaseOrderList(): ReactElement {
  const [createPurchaseOrderDialogOpen, setCreatePurchaseOrderDialogOpen] =
    useState(false);
  const { data, loading } = usePurchaseOrdersQuery({});
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
      minWidth: 90,
      flex: 1,
      type: "date",
      valueFormatter: params => {
        return new Date(params.value as string).toLocaleDateString();
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 1,
      type: "string",
      valueGetter: ({
        row: { status },
      }: {
        row: PurchaseOrderListFieldsFragment;
      }) => {
        return capitalize(status);
      },
    },
    {
      field: "companyName",
      headerName: "Company",
      minWidth: 120,
      flex: 1,
      type: "string",
      valueGetter: ({ row }: { row: PurchaseOrderListFieldsFragment }) => {
        return row.company.name;
      },
    },
    {
      field: "expectedDeliveryDate",
      headerName: "Delivery Date",
      minWidth: 140,
      flex: 1,
      type: "date",
      valueFormatter: params => {
        return new Date(params.value as string).toLocaleDateString();
      },
    },
    {
      field: "factoryName",
      headerName: "Factory",
      minWidth: 120,
      flex: 5,
      type: "string",
      valueGetter: ({ row }: { row: PurchaseOrderListFieldsFragment }) => {
        return row.factory.name;
      },
    },
  ];

  function CustomToolbar() {
    return (
      <>
        <GridToolbarContainer>
          <RequireRole authorizedRoles={["Admin", "VChapman"]}>
            <Button
              variant={"text"}
              size={"small"}
              onClick={() => setCreatePurchaseOrderDialogOpen(true)}
            >
              Add purchase order
            </Button>
          </RequireRole>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarExport />
        </GridToolbarContainer>
      </>
    );
  }

  return (
    <>
      <CreatePurchaseOrderDialog
        open={createPurchaseOrderDialogOpen}
        onSave={() => setCreatePurchaseOrderDialogOpen(false)}
        onClose={() => setCreatePurchaseOrderDialogOpen(false)}
      />
      <ListView
        name="purchase-orders"
        rows={rows}
        columns={columns}
        getRowId={item => item.uid}
        loading={loading}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </>
  );
}
