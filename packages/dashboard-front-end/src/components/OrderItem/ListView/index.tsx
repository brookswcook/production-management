import { Container } from "@mui/material";
import { GridColDef, DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { Fragment, ReactElement } from "react";
import {
  OrderItemListFieldsFragment,
  useOrderItemsQuery,
} from "../../../generated/graphql";

export function OrderItemList(): ReactElement {
  const { data, loading, error } = useOrderItemsQuery();
  const rows: OrderItemListFieldsFragment[] = data?.orderItems ?? [];

  const columns: GridColDef<OrderItemListFieldsFragment>[] = [
    {
      field: "id",
      headerName: "id",
      minWidth: 50,
      flex: 1,
      type: "string",
    },
  ];

  function CustomToolbar() {
    return (
      <Fragment>
        <GridToolbarContainer></GridToolbarContainer>
      </Fragment>
    );
  }

  return (
    <Container maxWidth="xl">
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={item => String(item.id)}
        pageSize={100}
        loading={loading}
        error={error}
        autoHeight
        components={{
          Toolbar: CustomToolbar,
        }}
        disableSelectionOnClick
        sx={{ mt: 1 }}
      />
    </Container>
  );
}
