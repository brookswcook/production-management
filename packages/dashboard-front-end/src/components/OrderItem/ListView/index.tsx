import { Container } from "@mui/material";
import { GridColDef, DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { Fragment, ReactElement, useEffect, useState } from "react";
import {
  OrderItemListFieldsFragment,
  useOrderItemsQuery,
} from "../../../generated/graphql";

export function OrderItemList({
  orderUid,
}: {
  orderUid?: number;
}): ReactElement {
  const [attributeColumns, setAttributeColumns] = useState<
    GridColDef<OrderItemListFieldsFragment>[]
  >([]);

  const { data, loading, error } = useOrderItemsQuery({
    variables: { data: orderUid != null ? { orderUid } : null },
  });
  const rows: OrderItemListFieldsFragment[] = data?.orderItems ?? [];

  useEffect(() => {
    if (data == null || data.orderItems == null) return;
    const attributeKeys = data.orderItems
      .flatMap(item => item.variantAttributes)
      .map(({ key }) => key);
    const attributeColumns = attributeKeys.map(key => ({
      field: `${key}Attribute`,
      headerName: `${key[0].toUpperCase()}${key.slice(1)}`,
      minWidth: 50,
      flex: 1,
      type: "string",
      valueGetter: ({ row }: { row: OrderItemListFieldsFragment }) => {
        return (
          row.variantAttributes.find(item => item.key === key)?.value ?? ""
        );
      },
    }));
    setAttributeColumns(attributeColumns);
  });

  const columns: GridColDef<OrderItemListFieldsFragment>[] = [
    {
      field: "productCode",
      headerName: "Product",
      minWidth: 50,
      flex: 1,
      type: "string",
      valueGetter: ({ row }: { row: OrderItemListFieldsFragment }) => {
        return row.product.code;
      },
    },
    ...attributeColumns,
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 50,
      flex: 1,
      type: "number",
      valueGetter: ({ row }: { row: OrderItemListFieldsFragment }) => {
        return row.quantity;
      },
    },
    {
      field: "unitPrice",
      headerName: "Unit Price",
      minWidth: 50,
      flex: 1,
      type: "number",
      valueGetter: ({ row }: { row: OrderItemListFieldsFragment }) => {
        return row.price;
      },
    },
    {
      field: "extPrice",
      headerName: "Ext Price",
      minWidth: 50,
      flex: 1,
      type: "number",
      valueGetter: ({ row }: { row: OrderItemListFieldsFragment }) => {
        return row.price * row.quantity;
      },
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
        getRowId={item => item.id}
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
