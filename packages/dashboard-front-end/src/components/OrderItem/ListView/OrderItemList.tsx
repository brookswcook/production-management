import { Stack, Typography } from "@mui/material";
import {
  GridColDef,
  DataGrid,
  GridToolbarContainer,
  GridRenderCellParams,
  GridFooterContainer,
} from "@mui/x-data-grid";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  OrderItemListFieldsFragment,
  useOrderItemsQuery,
} from "../../../generated/graphql";
import RequireRole from "../../Auth/RequireRole";
import { CreateOrderItemBulkyPopperButton } from "../Form";

function toCurrency(number: number, currency = "$"): string {
  return `${currency}${number.toFixed(2)}`;
}

export function OrderItemList({
  orderUid,
  addActionDisabled = false,
}: {
  orderUid: number;
  addActionDisabled?: boolean;
}): ReactElement {
  const [attributeColumns, setAttributeColumns] = useState<
    GridColDef<OrderItemListFieldsFragment>[]
  >([]);

  const { data, loading, error } = useOrderItemsQuery({
    variables: { data: { orderUid } },
  });
  const rows: OrderItemListFieldsFragment[] = data?.orderItems ?? [];

  function generateAttributeColumnsSet(): GridColDef<OrderItemListFieldsFragment>[] {
    if (data == null || data.orderItems == null) return [];
    const attributeKeys = Array.from(
      new Set(
        data.orderItems
          .flatMap(item => item.variantAttributes)
          .map(({ key }) => key)
      )
    );
    return attributeKeys.map(key => ({
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
  }

  useEffect(() => {
    const attributeColumns = generateAttributeColumnsSet();
    setAttributeColumns(attributeColumns);
  }, [data]);

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
      renderCell({ value }: GridRenderCellParams<OrderItemListFieldsFragment>) {
        const productCode = String(value);
        const linkPath = `/products/${productCode}`;
        const linkText = `${productCode}`;
        return (
          <Link to={linkPath} style={{ textDecoration: "none" }}>
            {linkText}
          </Link>
        );
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
        return toCurrency(row.price);
      },
    },
    {
      field: "extPrice",
      headerName: "Ext Price",
      minWidth: 50,
      flex: 1,
      type: "number",
      valueGetter: ({ row }: { row: OrderItemListFieldsFragment }) => {
        return toCurrency(row.price * row.quantity);
      },
    },
  ];

  function CustomToolbar() {
    return (
      <Fragment>
        <GridToolbarContainer>
          <RequireRole authorizedRoles={["Admin", "VChapman"]}>
            <CreateOrderItemBulkyPopperButton
              disabled={addActionDisabled}
              orderUid={orderUid}
            />
          </RequireRole>
        </GridToolbarContainer>
      </Fragment>
    );
  }

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={item => item.id}
      loading={loading}
      error={error}
      autoHeight
      components={{
        Toolbar: CustomToolbar,
        Footer: () => {
          return (
            <GridFooterContainer sx={{ pl: 1, pr: 1 }}>
              <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
                <Typography>Total:</Typography>
                <Typography>{`Quantity: ${rows.reduce(
                  (acc, { quantity }) => acc + quantity,
                  0
                )}`}</Typography>
                <Typography>{`Price: ${toCurrency(
                  rows.reduce(
                    (acc, { price, quantity }) => acc + price * quantity,
                    0
                  )
                )}`}</Typography>
              </Stack>
            </GridFooterContainer>
          );
        },
      }}
      initialState={{
        pagination: {
          pageSize: 10,
        },
      }}
      rowsPerPageOptions={[5, 10, 20, 50, 100]}
      disableSelectionOnClick
      sx={{ mt: 1 }}
    />
  );
}
