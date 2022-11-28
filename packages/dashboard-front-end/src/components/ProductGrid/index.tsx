import { Container, Grid } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSelectionModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  ProductFieldsFragment,
  useProductsQuery,
} from "../../generated/graphql";
import { PopperButton } from "../PopperButton";
import AddIcon from "@mui/icons-material/Add";
import { CreateProductForm } from "../ProductForm";
import { Fragment, useState } from "react";
import { UploadTechPackPopperButton } from "../TechPackForm";
import SendSampleToolbarButton from "../SampleForm";
import { Link } from "react-router-dom";
import RequireRole from "../Auth/RequireRole";

export default function ProductGrid() {
  const { data, loading, error } = useProductsQuery({
    variables: {},
  });
  const rows: ProductFieldsFragment[] = data ? data.products : [];
  const [selectedGridItems, setSelectedGridItems] =
    useState<GridSelectionModel>([]);

  const selectedProductsCodes = Array.from(selectedGridItems.values());
  const selectedProducts = rows.filter(row =>
    selectedProductsCodes.some(code => row.code == code)
  );

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
      field: "factoryName",
      headerName: "Factory",
      minWidth: 50,
      flex: 1,
      type: "string",
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

  function CustomToolbar() {
    return (
      <Fragment>
        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarExport />
        </GridToolbarContainer>
        <GridToolbarContainer>
          <PopperButton icon={<AddIcon />} title="Add product">
            <CreateProductForm />
          </PopperButton>
          <RequireRole authorizedRoles={["Admin", "VChapman"]}>
            <UploadTechPackPopperButton
              styleCode={selectedProducts[0]?.style.code}
              disabled={selectedProducts.length !== 1}
            />
          </RequireRole>
          <SendSampleToolbarButton
            sampleType={"fabric"}
            parentCode={selectedProducts[0]?.fabric.code}
            disabled={selectedProducts.length !== 1}
          />
          <SendSampleToolbarButton
            sampleType={"fit"}
            parentCode={selectedProducts[0]?.code}
            disabled={selectedProducts.length !== 1}
          />
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
          pageSize={100}
          loading={loading}
          error={error}
          autoHeight
          onSelectionModelChange={selectionModel =>
            setSelectedGridItems(selectionModel)
          }
          rowsPerPageOptions={[10]}
          components={{
            Toolbar: CustomToolbar,
          }}
          checkboxSelection
          disableSelectionOnClick
          sx={{ mt: 1 }}
        />
      </Grid>
    </Container>
  );
}
