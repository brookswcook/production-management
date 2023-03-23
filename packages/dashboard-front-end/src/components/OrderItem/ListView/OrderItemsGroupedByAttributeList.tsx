import { Button, Stack, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFooter,
  GridFooterContainer,
  GridRenderCellParams,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  OrderItemsGroupedByAttributesFieldsFragment,
  useOrderItemsGroupedByAttributesQuery,
} from "../../../generated/graphql";
import RequireRole from "../../Auth/RequireRole";
import { CreateOrderItemByVariantSetsDialog } from "../Dialog/CreateOrderItemByVariantSetsDialog";
import AddIcon from "@mui/icons-material/Add";
import { toCurrency } from "../../Common";

function stringifyAttributes(attributes: { key: string; value: string }[]) {
  return attributes.length > 0
    ? attributes.map(({ key, value }) => `${key}: ${value}`).join("; ")
    : "No Attributes";
}

function stringifyVariantSetsAttributes({
  variantSets,
}: {
  variantSets: { attributes: { key: string; value: string }[] }[];
}): string[] {
  return variantSets.reduce<string[]>((acc, { attributes }) => {
    const attributesIdentifier = stringifyAttributes(attributes);
    return [...acc, attributesIdentifier];
  }, []);
}

export function OrderItemsGroupedByAttributeList({
  orderUid,
  addActionDisabled = false,
}: {
  orderUid: number;
  addActionDisabled?: boolean;
}): ReactElement {
  const { data, loading, error } = useOrderItemsGroupedByAttributesQuery({
    variables: { data: { orderUid } },
  });
  const [attributeColumns, setAttributeColumns] = useState<
    GridColDef<OrderItemsGroupedByAttributesFieldsFragment>[]
  >([]);
  const [createOrderItemsDialogOpen, setCreateOrderItemsDialogOpen] =
    useState(false);

  const rows: OrderItemsGroupedByAttributesFieldsFragment[] =
    data?.orderItemsGroupedByAttributes ?? [];

  function generateAttributeColumnsSet(): GridColDef<OrderItemsGroupedByAttributesFieldsFragment>[] {
    if (data == null || data.orderItemsGroupedByAttributes == null) return [];
    const variantSetsAttributeIdentifiers = Array.from(
      new Set(
        data.orderItemsGroupedByAttributes.flatMap(
          stringifyVariantSetsAttributes
        )
      )
    );

    return variantSetsAttributeIdentifiers.map(
      variantSetAttributeIdentifier => ({
        field: variantSetAttributeIdentifier,
        headerName: variantSetAttributeIdentifier,
        minWidth: 50,
        flex: 1,
        type: "string",
        valueGetter: ({
          row,
        }: {
          row: OrderItemsGroupedByAttributesFieldsFragment;
        }) => {
          const variantSet = row.variantSets.find(({ attributes }) => {
            const variantSetIdentifier = stringifyAttributes(attributes);
            return variantSetIdentifier === variantSetAttributeIdentifier;
          });
          return variantSet != null ? variantSet.quantity : 0;
        },
      })
    );
  }

  useEffect(() => {
    const attributeColumns = generateAttributeColumnsSet();
    setAttributeColumns(attributeColumns);
  }, [data]);

  const columns: GridColDef<OrderItemsGroupedByAttributesFieldsFragment>[] = [
    {
      field: "productCode",
      headerName: "Product",
      minWidth: 50,
      flex: 1,
      type: "string",
      valueGetter: ({
        row,
      }: {
        row: OrderItemsGroupedByAttributesFieldsFragment;
      }) => {
        return row.productCode;
      },
      renderCell({
        value,
      }: GridRenderCellParams<OrderItemsGroupedByAttributesFieldsFragment>) {
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
      valueGetter: ({
        row,
      }: {
        row: OrderItemsGroupedByAttributesFieldsFragment;
      }) => {
        return row.quantity;
      },
    },
    {
      field: "unitPrice",
      headerName: "Unit Price",
      minWidth: 50,
      flex: 1,
      type: "number",
      valueGetter: ({
        row,
      }: {
        row: OrderItemsGroupedByAttributesFieldsFragment;
      }) => {
        return toCurrency(row.unitPrice);
      },
    },
    {
      field: "extPrice",
      headerName: "Ext Price",
      minWidth: 50,
      flex: 1,
      type: "number",
      valueGetter: ({
        row,
      }: {
        row: OrderItemsGroupedByAttributesFieldsFragment;
      }) => {
        return toCurrency(row.extPrice);
      },
    },
  ];

  function CustomToolbar() {
    return (
      <Fragment>
        <GridToolbarContainer>
          <RequireRole authorizedRoles={["Admin", "VChapman"]}>
            <Button
              disabled={addActionDisabled}
              variant={"text"}
              size={"small"}
              onClick={() => setCreateOrderItemsDialogOpen(true)}
            >
              <AddIcon />
              Add items
            </Button>
          </RequireRole>
        </GridToolbarContainer>
      </Fragment>
    );
  }

  return (
    <>
      <CreateOrderItemByVariantSetsDialog
        orderUid={orderUid}
        open={createOrderItemsDialogOpen}
        onSave={() => setCreateOrderItemsDialogOpen(false)}
        onClose={() => setCreateOrderItemsDialogOpen(false)}
      />

      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={item =>
          item.productCode +
          stringifyVariantSetsAttributes(item).join(";") +
          item.quantity.toString()
        }
        loading={loading}
        error={error}
        autoHeight
        components={{
          Toolbar: CustomToolbar,
          Footer: () => {
            return (
              <GridFooterContainer sx={{ pl: 1, pr: 1 }}>
                <Stack
                  direction={"row"}
                  justifyContent={"flex-end"}
                  spacing={2}
                >
                  <Typography>Total:</Typography>
                  <Typography>{`Quantity: ${rows.reduce(
                    (acc, { quantity }) => acc + quantity,
                    0
                  )}`}</Typography>
                  <Typography>{`Price: ${toCurrency(
                    rows.reduce((acc, { extPrice }) => acc + extPrice, 0)
                  )}`}</Typography>
                </Stack>
                <GridFooter
                  sx={{
                    border: "none",
                  }}
                />
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
    </>
  );
}
