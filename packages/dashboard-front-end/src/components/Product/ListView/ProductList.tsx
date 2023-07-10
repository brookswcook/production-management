import {
  ProductFieldsFragment,
  useProductsQuery,
} from "../../../generated/graphql";
import { ReactElement, Suspense, lazy, useState } from "react";
import { ListView, RenderCellExpand } from "../../ListView";
import { HideableGridColDef } from "../../ListView/types";

const CreateProductDialog = lazy(() => import("../Dialog/CreateProductDialog"));
const GridToolbarContainer = lazy(() =>
  import("@mui/x-data-grid").then(module => ({
    default: module.GridToolbarContainer,
  }))
);
const GridToolbarColumnsButton = lazy(() =>
  import("@mui/x-data-grid").then(module => ({
    default: module.GridToolbarColumnsButton,
  }))
);
const GridToolbarExport = lazy(() =>
  import("@mui/x-data-grid").then(module => ({
    default: module.GridToolbarExport,
  }))
);
const GridToolbarFilterButton = lazy(() =>
  import("@mui/x-data-grid").then(module => ({
    default: module.GridToolbarFilterButton,
  }))
);
const Button = lazy(() => import("@mui/material/Button"));
const RequireRole = lazy(() => import("../../Auth/RequireRole"));
const Link = lazy(() =>
  import("react-router-dom").then(module => ({
    default: module.Link,
  }))
);

export default function ProductList(): ReactElement {
  const [createProductDialogOpen, setCreateProductDialogOpen] = useState(false);
  const { data, loading } = useProductsQuery({
    variables: {},
  });
  const rows: ProductFieldsFragment[] = data ? data.products : [];

  const columns: HideableGridColDef<ProductFieldsFragment>[] = [
    {
      field: "name",
      headerName: "Title",
      minWidth: 150,
      flex: 3,
      renderCell({ id, formattedValue }) {
        const linkPath = `/products/${id}`;
        const linkText = `${formattedValue as string}`;
        return (
          <Suspense fallback={<span>{linkText}</span>}>
            <Link to={linkPath} style={{ textDecoration: "none" }}>
              {linkText}
            </Link>
          </Suspense>
        );
      },
    },
    {
      field: "styleName",
      headerName: "Style Name",
      minWidth: 130,
      flex: 1,
      type: "string",
      valueGetter: ({ row }: { row: ProductFieldsFragment }) => {
        return row.style.name;
      },
      hideOnMobile: true,
    },
    {
      field: "styleCode",
      headerName: "Style #",
      minWidth: 95,
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
      minWidth: 90,
      flex: 1,
      type: "string",
      valueGetter: ({ row }: { row: ProductFieldsFragment }) => {
        return row.fabric.code;
      },
      hideOnMobile: true,
    },
    {
      field: "colorName",
      headerName: "Color",
      minWidth: 120,
      flex: 1,
      type: "string",
      valueGetter: ({ row }: { row: ProductFieldsFragment }) => {
        return row.fabric.colorName;
      },
      hideOnMobile: true,
    },
    {
      field: "deliveryDate",
      headerName: "Delivery",
      minWidth: 100,
      flex: 1,
      type: "date",
      valueFormatter: params => {
        return new Date(params.value as string).toLocaleDateString();
      },
    },
    {
      field: "dueIn",
      headerName: "Due in",
      minWidth: 90,
      flex: 1,
      valueFormatter: params => {
        return `${params.value as string} days`;
      },
      hideOnMobile: false,
    },
    {
      field: "stage",
      headerName: "Stage",
      minWidth: 120,
      flex: 1,
      type: "string",
      hideOnMobile: false,
    },
    {
      field: "onTime",
      headerName: "On time",
      description: "Product lifecycle based on workflow rules is on time",
      minWidth: 100,
      flex: 1,
      type: "boolean",
    },
    {
      field: "techPackUploaded",
      description: "Tech pack is uploaded",
      headerName: "Tech pack",
      minWidth: 115,
      flex: 1,
    },
    {
      field: "fabricSampleDelivered",
      description: "Fabric sample is delivered",
      headerName: "Fabric Sample",
      minWidth: 140,
      flex: 1,
      type: "boolean",
      hideOnMobile: false,
    },
    {
      field: "fitSampleDelivered",
      description: "Fit sample is delivered",
      headerName: "Fit Sample",
      minWidth: 120,
      flex: 1,
      type: "boolean",
      hideOnMobile: false,
    },
    {
      field: "factoryCode",
      headerName: "Factory",
      minWidth: 110,
      flex: 5,
      type: "string",
      renderCell: RenderCellExpand,
      valueGetter: ({ row }: { row: ProductFieldsFragment }) => {
        return row.factory.name;
      },
      hideOnMobile: true,
    },
  ];

  function CustomToolbar(): ReactElement {
    return (
      <Suspense fallback={<div></div>}>
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
      </Suspense>
    );
  }

  return (
    <>
      <Suspense fallback={<div></div>}>
        <CreateProductDialog
          open={createProductDialogOpen}
          onSave={() => setCreateProductDialogOpen(false)}
          onClose={() => setCreateProductDialogOpen(false)}
        />
      </Suspense>
      <ListView
        name="products"
        rows={rows}
        columns={columns}
        getRowId={item => item.code}
        loading={loading}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </>
  );
}
