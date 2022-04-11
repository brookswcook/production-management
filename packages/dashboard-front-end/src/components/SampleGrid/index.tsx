import { ApolloError } from "@apollo/client";
import { Box, Button } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { Sample, useApproveFitSampleMutation } from "../../generated/graphql";

export default function SampleGrid({
  productCode,
  samples: rows,
}: {
  productCode: string;
  samples: Omit<Sample, "typename">[];
}) {
  const [selectedGridItems, setSelectedGridItems] =
    useState<GridSelectionModel>([]);
  const [approveFitSampleMutation] = useApproveFitSampleMutation({
    refetchQueries: ["Product"],
  });

  // TODO: reuse it since there's a similar thing in ProductGrid
  const selectedSampleSkus = Array.from(selectedGridItems.values());
  const selectedSamples = rows.filter(row =>
    selectedSampleSkus.some(sku => row.sku == sku)
  );
  const selectedSingleSampleSku =
    selectedSamples.length === 1 ? selectedSamples[0].sku : undefined;

  const columns: GridColDef[] = [
    { field: "sku", headerName: "SKU", type: "string", flex: 2 },
    {
      field: "trackNumber",
      headerName: "Track Number",
      type: "string",
      flex: 2,
    },
    { field: "delivered", headerName: "Delivered", type: "boolean", flex: 1 },
    { field: "approved", headerName: "Approved", type: "boolean", flex: 1 },
  ];

  return (
    <Box sx={{ height: "200px", width: "100%", pt: 1 }}>
      <DataGrid
        rows={rows ?? []}
        columns={columns}
        pageSize={5}
        getRowId={item => item.sku as string}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={selectionModel =>
          setSelectedGridItems(selectionModel)
        }
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </Box>
  );

  function CustomToolbar() {
    return (
      <Fragment>
        <GridToolbarContainer>
          <Button
            variant="text"
            size="small"
            onClick={approveFitSample}
            disabled={selectedSamples.length !== 1}
          >
            Approve fit sample
          </Button>
        </GridToolbarContainer>
      </Fragment>
    );
  }

  async function approveFitSample() {
    try {
      await approveFitSampleMutation({
        variables: {
          data: { productCode, sku: selectedSingleSampleSku ?? "" },
        },
      });
    } catch (error) {
      toast.error((error as ApolloError).message);
    }
  }
}
