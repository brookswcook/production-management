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
import {
  ProductFieldsFragment,
  useProductsQuery,
} from "../../../generated/graphql";
import { PopperButton } from "../../PopperButton";
import AddIcon from "@mui/icons-material/Add";
import { CreateProductForm } from "../Form/CreateProductForm";
import { Fragment, ReactElement } from "react";
import { Link } from "react-router-dom";
import RequireRole from "../../Auth/RequireRole";
import { renderCellExpand } from "../../Common/GridCellExpand";

export function ProductList(): ReactElement {
  const { data, loading, error } = useProductsQuery({
    variables: {},
  });
  const rows: ProductFieldsFragment[] = data ? data.products : [];

  const columns: GridColDef<ProductFieldsFragment>[] = [
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
    },
    {
      field: "fabricSampleDelivered",
      description: "Fabric sample is delivered",
      headerName: "Fabric Sample",
      minWidth: 50,
      flex: 1,
      type: "boolean",
    },
    {
      field: "fitSampleDelivered",
      description: "Fit sample is delivered",
      headerName: "Fit Sample",
      minWidth: 50,
      flex: 1,
      type: "boolean",
    },
  ];

  function CustomToolbar(): ReactElement {
    return (
      <Fragment>
        <GridToolbarContainer>
          <RequireRole authorizedRoles={["Admin", "VChapman"]}>
            <PopperButton icon={<AddIcon />} title="Add product">
              <CreateProductForm />
            </PopperButton>
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
          getRowId={item => item.code}
          loading={loading}
          error={error}
          autoHeight
          initialState={{
            pagination: {
              pageSize: 20,
            },
          }}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
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
