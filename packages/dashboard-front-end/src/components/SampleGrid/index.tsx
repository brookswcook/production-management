import { ApolloError } from "@apollo/client";
import { Box, Button, Stack, TextField } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { FormEvent, Fragment, useState } from "react";
import { toast } from "react-toastify";
import {
  Sample,
  useApproveFabricSampleMutation,
  useApproveFitSampleMutation,
  useRejectFabricSampleMutation,
  useRejectFitSampleMutation,
} from "../../generated/graphql";
import GridToolbarButton from "../GridToolbarButton";

export default function SampleGrid({
  parentCode,
  sampleType,
  samples: rows,
}: {
  parentCode: string;
  sampleType: "fit" | "fabric";
  samples: Omit<Sample, "typename">[];
}) {
  const refetchPolicy = {
    refetchQueries: ["Product"],
  };
  const [selectedGridItems, setSelectedGridItems] =
    useState<GridSelectionModel>([]);
  const [approveFitSampleMutation] = useApproveFitSampleMutation(refetchPolicy);
  const [rejectFitSampleMutation] = useRejectFitSampleMutation(refetchPolicy);
  const [approveFabricSampleMutation] =
    useApproveFabricSampleMutation(refetchPolicy);
  const [rejectFabricSampleMutation] =
    useRejectFabricSampleMutation(refetchPolicy);

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
    {
      field: "comment",
      headerName: "Rejection Comment",
      type: "string",
      flex: 2,
      valueGetter: ({ row }: { row: Sample }) => {
        return row.note?.text;
      },
    },
  ];

  return (
    <Box sx={{ height: "300px", width: "100%", pt: 1 }}>
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
    const [rejectionText, setRejectionText] = useState<string>("");
    return (
      <Fragment>
        <GridToolbarContainer>
          <Button
            variant="text"
            size="small"
            onClick={approveSample}
            disabled={selectedSamples.length !== 1}
          >
            Approve
          </Button>
          <GridToolbarButton
            icon={<Fragment />}
            title={"Reject"}
            disabled={selectedSamples.length !== 1}
          >
            <Stack
              component="form"
              onSubmit={rejectSample}
              spacing={2}
              autoComplete="off"
            >
              <TextField
                label="Rejection comment"
                name="styleCode"
                onChange={({ target: { value } }) => {
                  setRejectionText(value);
                }}
                required
              />
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Stack>
          </GridToolbarButton>
        </GridToolbarContainer>
      </Fragment>
    );
    async function approveSample() {
      try {
        await (sampleType == "fit"
          ? approveFitSampleMutation
          : approveFabricSampleMutation)({
          variables: {
            data: { parentCode, sku: selectedSingleSampleSku ?? "" },
          },
        });
      } catch (error) {
        toast.error((error as ApolloError).message);
      }
    }

    async function rejectSample(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      try {
        await (sampleType == "fit"
          ? rejectFitSampleMutation
          : rejectFabricSampleMutation)({
          variables: {
            data: {
              parentCode,
              sku: selectedSingleSampleSku ?? "",
              rejectionText,
            },
          },
        });
      } catch (error) {
        toast.error((error as ApolloError).message);
      }
    }
  }
}
