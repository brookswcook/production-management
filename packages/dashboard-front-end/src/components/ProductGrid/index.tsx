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
import GridToolbarButton from "../GridToolbarButton";
import AddIcon from "@mui/icons-material/Add";
import NewProduct from "../NewProduct";
import { Fragment, useState } from "react";
import TechPackParams from "../TechPackParams";
import { SendSampleParams } from "../SampleParams";
import { Link } from "react-router-dom";

export default function ProductGrid() {
  const { data, loading, error } = useProductsQuery({
    variables: {},
  });
  const rows: ProductFieldsFragment[] = data ? data.products : [];
  const [selectedGridItems, setSelectedGridItems] =
    useState<GridSelectionModel>([]);

  const selectedProductsNames = Array.from(selectedGridItems.values());
  const selectedProducts = rows.filter(row =>
    selectedProductsNames.some(name => row.name == name)
  );
  const selectedSingleProductName =
    selectedProducts.length === 1 ? selectedProducts[0].name : undefined;

  const columns: GridColDef[] = [
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
      field: "deliveryDate",
      headerName: "Delivery date",
      minWidth: 80,
      flex: 3,
      type: "date",
      valueFormatter: params => {
        return new Date(params.value as string).toLocaleDateString();
      },
    },
    {
      field: "dueIn",
      headerName: "Due in",
      minWidth: 70,
      flex: 2,
      valueFormatter: params => {
        return `${params.value as string} days`;
      },
    },
    {
      field: "stage",
      headerName: "Stage",
      flex: 2,
      type: "string",
    },
    {
      field: "onTime",
      headerName: "On time",
      description: "Product lifecycle based on workflow rules is on time",
      flex: 2,
      type: "boolean",
    },
    {
      field: "techPackUploaded",
      description: "Tech pack is uploaded",
      headerName: "Tech pack",
      flex: 2,
      type: "boolean",
    },
    {
      field: "fabricSampleDelivered",
      description: "Fabric sample is delivered",
      headerName: "Fabric Sample",
      flex: 2,
      type: "boolean",
    },
    {
      field: "fitSampleDelivered",
      description: "Fit sample is delivered",
      headerName: "Fit Sample",
      flex: 2,
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
          <GridToolbarButton
            icon={<AddIcon />}
            title="New"
            children={<NewProduct />}
          />
          <GridToolbarButton
            icon={<Fragment />}
            title="Upload TP"
            children={
              <TechPackParams productName={selectedSingleProductName} />
            }
            disabled={selectedProducts.length !== 1}
          />
          <GridToolbarButton
            icon={<Fragment />}
            title="Send FaS"
            children={
              <SendSampleParams productName={selectedSingleProductName} />
            }
            disabled={selectedProducts.length !== 1}
          />
          <GridToolbarButton
            icon={<Fragment />}
            title="Mark FaS delivered"
            children={<Fragment />}
            disabled={selectedProducts.length !== 1}
          />
          <GridToolbarButton
            icon={<Fragment />}
            title="Approve FaS"
            children={<Fragment />}
            disabled={selectedProducts.length !== 1}
          />
          <GridToolbarButton
            icon={<Fragment />}
            title="Send FiS"
            children={
              <SendSampleParams productName={selectedSingleProductName} />
            }
            disabled={selectedProducts.length !== 1}
          />
          <GridToolbarButton
            icon={<Fragment />}
            title="Mark FiS delivered"
            children={<Fragment />}
            disabled={selectedProducts.length !== 1}
          />
          <GridToolbarButton
            icon={<Fragment />}
            title="Approve FiS"
            children={<Fragment />}
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
          getRowId={item => item.name as string}
          pageSize={10}
          loading={loading}
          error={error}
          autoHeight
          onSelectionModelChange={selectionModel =>
            setSelectedGridItems(selectionModel)
          }
          rowsPerPageOptions={[5]}
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
