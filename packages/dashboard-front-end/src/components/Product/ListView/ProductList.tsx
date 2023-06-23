import {
  GridRenderCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  ProductFieldsFragment,
  useProductsQuery,
} from "../../../generated/graphql";
import { Link } from "react-router-dom";
import { ReactElement, useState } from "react";
import RequireRole from "../../Auth/RequireRole";
import { renderCellExpand, ListView } from "../../ListView";
import { Button } from "@mui/material";
import CreateProductDialog from "../Dialog/CreateProductDialog";
import { HideableGridColDef } from "../../ListView/types";

export default function ProductList(): ReactElement {
  const [createProductDialogOpen, setCreateProductDialogOpen] = useState(false);
  const { data, loading, error } = useProductsQuery({
    variables: {},
  });
  const rows: ProductFieldsFragment[] = data ? data.products : [];

  const columns: HideableGridColDef<ProductFieldsFragment>[] = [
    {
      field: "name",
      headerName: "Title",
      minWidth: 120,
      flex: 3,
      renderCell({ id, formattedValue }: GridRenderCellParams) {
        const linkPath = `/products/${id}`;
        const linkText = `${formattedValue as string}`;
        return (
          <Link to={linkPath} style={{ textDecoration: "none" }}>
            {linkText}
          </Link>
        );
      },
    },
    {
      field: "styleName",
      headerName: "Style Name",
      minWidth: 70,
      flex: 1,
      type: "string",
      valueGetter: ({ row }: { row: ProductFieldsFragment }) => {
        return row.style.name;
      },
      hideOnMobile: true,
    },
    {
      field: "styleCode",
      headerName: "Style Number",
      minWidth: 50,
      flex: 1,
      type: "string",
      valueGetter: ({ row }: { row: ProductFieldsFragment }) => {
        return row.style.code;
      },
      hideOnMobile: true,
    },
    {
      field: "fabricCode",
      headerName: "Fabric",
      minWidth: 50,
      flex: 1,
      type: "string",
      valueGetter: ({ row }: { row: ProductFieldsFragment }) => {
        return row.fabric.code;
      },
    },
    {
      field: "colorName",
      headerName: "Color Name",
      minWidth: 70,
      flex: 1,
      type: "string",
      valueGetter: ({ row }: { row: ProductFieldsFragment }) => {
        return row.fabric.colorName;
      },
    },
    {
      field: "factoryCode",
      headerName: "Factory",
      minWidth: 50,
      flex: 1,
      type: "string",
      renderCell: renderCellExpand,
      valueGetter: ({ row }: { row: ProductFieldsFragment }) => {
        return row.factory.name;
      },
    },
    {
      field: "deliveryDate",
      headerName: "Delivery date",
      minWidth: 70,
      flex: 1,
      type: "date",
      valueFormatter: params => {
        return new Date(params.value as string).toLocaleDateString();
      },
    },
    {
      field: "dueIn",
      headerName: "Due in",
      minWidth: 70,
      flex: 1,
      valueFormatter: params => {
        return `${params.value as string} days`;
      },
    },
    {
      field: "stage",
      headerName: "Stage",
      minWidth: 70,
      flex: 1,
      type: "string",
    },
    {
      field: "onTime",
      headerName: "On time",
      description: "Product lifecycle based on workflow rules is on time",
      minWidth: 50,
      flex: 1,
      type: "boolean",
    },
    {
      field: "techPackUploaded",
      description: "Tech pack is uploaded",
      headerName: "Tech pack",
      minWidth: 50,
      flex: 1,
      type: "boolean",
      hideOnMobile: true,
    },
    {
      field: "fabricSampleDelivered",
      description: "Fabric sample is delivered",
      headerName: "Fabric Sample",
      minWidth: 50,
      flex: 1,
      type: "boolean",
      hideOnMobile: true,
    },
    {
      field: "fitSampleDelivered",
      description: "Fit sample is delivered",
      headerName: "Fit Sample",
      minWidth: 50,
      flex: 1,
      type: "boolean",
      hideOnMobile: true,
    },
  ];

  function CustomToolbar(): ReactElement {
    return (
      <GridToolbarContainer>
        <RequireRole authorizedRoles={["Admin", "VChapman"]}>
          <Button
            variant={"text"}
            size={"small"}
            onClick={() => setCreateProductDialogOpen(true)}
          >
            Add product
          </Button>
        </RequireRole>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <CreateProductDialog
        open={createProductDialogOpen}
        onSave={() => setCreateProductDialogOpen(false)}
        onClose={() => setCreateProductDialogOpen(false)}
      />
      <ListView
        rows={rows}
        columns={columns}
        getRowId={item => item.code}
        loading={loading}
        error={error}
        components={{
          Toolbar: CustomToolbar,
        }}
        disableSelectionOnClick
      />
    </>
  );
}
