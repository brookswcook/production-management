import { ApolloError } from "@apollo/client";
import { Box, Button } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Sample,
  useApproveFitSampleMutation,
  useMarkFitSampleAsDeliveredMutation,
  useApproveFabricSampleMutation,
  useImageLinkLazyQuery,
  useMarkFabricSampleAsDeliveredMutation,
} from "../../../generated/graphql";
import RequireRole from "../../Auth/RequireRole";
import { renderCellExpand } from "../../ListView";
import RejectSampleDialog from "../Dialog/RejectSampleDialog";
import SendSampleDialog from "../Dialog/SendSampleDialog";

export default function SampleList({
  parentCode,
  sampleType,
  samples: rows,
}: {
  parentCode: string;
  sampleType: "fit" | "fabric";
  samples: Omit<Sample, "typename">[];
}): ReactElement {
  const refetchPolicy = {
    refetchQueries: ["Fabrics", "ActionLogs", "Products", "Fabric", "Product"],
  };
  const [selectedGridItems, setSelectedGridItems] =
    useState<GridSelectionModel>([]);
  const [sendSampleDialogOpen, setSendSampleDialogOpen] = useState(false);
  const [rejectSampleDialogOpen, setRejectSampleDialogOpen] = useState(false);

  const [approveFitSampleMutation] = useApproveFitSampleMutation(refetchPolicy);

  const [markFabricSampleAsDelivered] =
    useMarkFabricSampleAsDeliveredMutation(refetchPolicy);
  const [markFitSampleAsDelivered] =
    useMarkFitSampleAsDeliveredMutation(refetchPolicy);
  const [approveFabricSampleMutation] =
    useApproveFabricSampleMutation(refetchPolicy);

  // TODO: reuse it since there's a similar thing in ProductGrid
  const selectedSampleSkus = Array.from(selectedGridItems.values());
  const selectedSamples = rows.filter(row =>
    selectedSampleSkus.some(sku => row.sku == sku)
  );

  const columns: GridColDef<Sample>[] = [
    {
      field: "sku",
      headerName: "Sample Number",
      minWidth: 120,
      type: "string",
      flex: 1,
    },
    {
      field: "trackNumber",
      headerName: "Tracking Number",
      minWidth: 130,
      type: "string",
      flex: 1,
    },
    {
      field: "delivered",
      headerName: "Delivered",
      minWidth: 80,
      type: "boolean",
      flex: 1,
    },
    {
      field: "approved",
      headerName: "Approved",
      minWidth: 80,
      type: "boolean",
      flex: 1,
    },
    {
      field: "attachment",
      headerName: "Comment Attachment",
      minWidth: 160,
      type: "boolean",
      flex: 1,
      valueGetter: ({ row }: { row: Sample }) => {
        return (
          row.note?.imageFileNames != null &&
          row.note?.imageFileNames.length > 0
        );
      },
    },
    {
      field: "commentAuthor",
      headerName: "Comment author",
      minWidth: 130,
      type: "string",
      flex: 1,
      valueGetter: ({ row }: { row: Sample }) => {
        return row.note?.user?.fullName;
      },
    },
    {
      field: "commentDate",
      headerName: "Comment date",
      minWidth: 110,
      type: "date",
      flex: 1,
      valueGetter: ({ row }: { row: Sample }) => {
        if (row.note?.createdAt == null) return "";
        return new Date(row.note?.createdAt).toLocaleDateString();
      },
    },
    // Add a user comment to the timeline when a sample is rejected with comment
    {
      field: "comment",
      headerName: "Rejection Comment",
      minWidth: 140,
      type: "string",
      flex: 4,
      renderCell: renderCellExpand,
      valueGetter: ({ row }: { row: Sample }) => {
        return row.note?.text ?? "";
      },
    },
  ];

  return (
    <Box sx={{ height: "300px", width: "100%", pt: 1 }}>
      <RejectSampleDialog
        parentCode={parentCode}
        sampleType={sampleType}
        open={rejectSampleDialogOpen}
        sku={selectedSamples[0]?.sku ?? ""}
        onSave={() => setRejectSampleDialogOpen(false)}
        onClose={() => setRejectSampleDialogOpen(false)}
      />
      <SendSampleDialog
        sampleType={sampleType}
        parentCode={parentCode}
        open={sendSampleDialogOpen}
        onSave={() => setSendSampleDialogOpen(false)}
        onClose={() => setSendSampleDialogOpen(false)}
      />
      <DataGrid
        rows={rows ?? []}
        columns={columns}
        getRowId={item => item.sku}
        initialState={{
          pagination: {
            pageSize: 5,
          },
        }}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
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

  function CustomToolbar(): ReactElement {
    const [noteFileLink, setNoteFileLink] = useState<string>();
    const [getImageFileLink] = useImageLinkLazyQuery();

    useEffect(() => {
      void generateNoteFileLink();
      return () => {};
    }, [selectedGridItems]);

    return (
      <>
        <GridToolbarContainer>
          <Box sx={{ display: { xs: "inline", sm: "none" } }}></Box>
          <Box sx={{ display: { xs: "none", sm: "inline" } }}>
            <Button
              variant={"text"}
              size={"small"}
              onClick={() => setSendSampleDialogOpen(true)}
            >
              {`New ${sampleType == "fit" ? "fit" : "fabric"} sample`}
            </Button>
            <RequireRole authorizedRoles={["Admin", "VChapman"]}>
              <Button
                variant="text"
                size="small"
                onClick={markAsDelivered}
                disabled={selectedSamples.length !== 1}
              >
                Mark As Delivered
              </Button>
            </RequireRole>
            <RequireRole authorizedRoles={["Admin", "VChapman"]}>
              <Button
                variant="text"
                size="small"
                onClick={approveSample}
                disabled={selectedSamples.length !== 1}
              >
                Approve
              </Button>
            </RequireRole>
            <RequireRole authorizedRoles={["Admin", "VChapman"]}>
              <Button
                variant="text"
                size="small"
                onClick={() => setRejectSampleDialogOpen(true)}
                disabled={selectedSamples.length !== 1}
              >
                Reject
              </Button>
            </RequireRole>
            <a
              href={noteFileLink}
              target="_blank"
              style={{
                pointerEvents: `${
                  selectedSamples.length == 1 ? "auto" : "none"
                }`,
                textDecoration: "none",
              }}
            >
              <Button
                variant="text"
                size="small"
                disabled={selectedSamples.length !== 1}
              >
                Download Comment Attachment
              </Button>
            </a>
          </Box>
          <GridToolbarFilterButton />
        </GridToolbarContainer>
      </>
    );
    async function markAsDelivered() {
      try {
        await (sampleType == "fit"
          ? markFitSampleAsDelivered
          : markFabricSampleAsDelivered)({
          variables: {
            data: { parentCode, sku: selectedSamples[0].sku ?? "" },
          },
        });
      } catch (error) {
        toast.error((error as ApolloError).message);
      }
    }

    async function approveSample() {
      try {
        await (sampleType == "fit"
          ? approveFitSampleMutation
          : approveFabricSampleMutation)({
          variables: {
            data: { parentCode, sku: selectedSamples[0].sku ?? "" },
          },
        });
      } catch (error) {
        toast.error((error as ApolloError).message);
      }
    }

    // TODO: create and use common way for getting files
    async function generateNoteFileLink() {
      const selectedSample = selectedSamples[0];
      if (selectedSample?.note != null) {
        if (selectedSample.note.imageFileNames.length > 0) {
          try {
            const { data } = await getImageFileLink({
              variables: { fileName: selectedSample.note.imageFileNames[0] },
            });
            setNoteFileLink(data?.imageLink ?? "#");
          } catch (error) {
            toast.error((error as ApolloError).message);
          }
        }
      }
    }
  }
}
