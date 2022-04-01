import { Container, Grid } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useProductsQuery } from "../../generated/graphql";
import GridToolbarButton from "../GridToolbarButton";
import AddIcon from "@mui/icons-material/Add";
import NewProduct from "../NewProduct";
import { useEffect, useState } from "react";
import TechPackParams from "../TechPackParams";

export default function ProductGrid() {
  const { data, loading, error } = useProductsQuery({
    variables: {},
  });
  const [selectedItems, setSelectedItems] = useState<GridSelectionModel>([]);
  const [singleSelectedItem, setSingleSelectedItem] = useState<
    string | undefined
  >();

  useEffect(() => {
    selectedItems.length === 1
      ? setSingleSelectedItem(selectedItems.at(0)?.valueOf().toString())
      : setSingleSelectedItem(undefined);
  }, [selectedItems]);

  const rows = data ? data.products : [];
  const columns: GridColDef[] = [
    { field: "name", headerName: "Title", minWidth: 120, flex: 3 },
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
      <GridToolbarContainer>
        <GridToolbarButton
          icon={<AddIcon />}
          title="New"
          children={<NewProduct />}
        />
        <GridToolbarButton
          icon={<AddIcon />}
          title="Upload TP"
          children={<TechPackParams productName={singleSelectedItem} />}
          disabled={singleSelectedItem == null}
        />
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
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
            setSelectedItems(selectionModel)
          }
          rowsPerPageOptions={[5]}
          components={{
            Toolbar: CustomToolbar,
          }}
          checkboxSelection
          disableSelectionOnClick
        />
      </Grid>
    </Container>
  );
}
