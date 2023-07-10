import { ApolloError } from "@apollo/client";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  GridColDef,
  GridRowSelectionModel,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Fragment, useEffect, useRef, useState } from "react";
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
import { ListView, RenderCellExpand } from "../../ListView";
import RejectSampleDialog from "../Dialog/RejectSampleDialog";
import SendSampleDialog from "../Dialog/SendSampleDialog";
import MenuIcon from "@mui/icons-material/Menu";
import ActionMenu from "../../ActionMenu/ActionMenu";

export default function SampleList({
  parentCode,
  sampleType,
  samples: rows,
}: {
  parentCode: string;
  sampleType: "fit" | "fabric";
  samples: Omit<Sample, "typename">[];
}) {
  const refetchPolicy = {
    refetchQueries: ["Fabrics", "ActionLogs", "Products", "Fabric", "Product"],
  };
  const [selectedGridItems, setSelectedGridItems] =
    useState<GridRowSelectionModel>([]);
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
      minWidth: 180,
      type: "string",
      flex: 1,
    },
    {
      field: "trackNumber",
      headerName: "Tracking Number",
      minWidth: 180,
      type: "string",
      flex: 1,
    },
    {
      field: "delivered",
      headerName: "Delivered",
      minWidth: 140,
      type: "boolean",
      flex: 1,
    },
    {
      field: "approved",
      headerName: "Approved",
      minWidth: 140,
      type: "boolean",
      flex: 1,
    },
    {
      field: "attachment",
      headerName: "Comment Attachment",
      minWidth: 220,
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
      minWidth: 180,
      type: "string",
      flex: 1,
      valueGetter: ({ row }: { row: Sample }) => {
        return row.note?.user?.fullName;
      },
    },
    {
      field: "commentDate",
      headerName: "Comment date",
      minWidth: 170,
      type: "date",
      flex: 1,
      valueGetter: ({ row }: { row: Sample }) => {
        if (row.note?.createdAt == null) return "";
        return new Date(row.note?.createdAt);
      },
    },
    // Add a user comment to the timeline when a sample is rejected with comment
    {
      field: "comment",
      headerName: "Rejection Comment",
      minWidth: 180,
      type: "string",
      flex: 4,
      renderCell: RenderCellExpand,
      valueGetter: ({ row }: { row: Sample }) => {
        return row.note?.text ?? "";
      },
    },
  ];

  return (
    <Grid item container>
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
      <ListView
        name={"sample-list"}
        rows={rows ?? []}
        columns={columns}
        getRowId={item => item.sku}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        checkboxSelection
        onRowSelectionModelChange={selectionModel =>
          setSelectedGridItems(selectionModel)
        }
        slots={{
          toolbar: CustomToolbar,
        }}
        disableGutters
        sx={{ mt: 1 }}
      />
    </Grid>
  );

  function CustomToolbar() {
    const actionsMenuAnchorElRef = useRef(null);
    const [actionsMenuAnchorEl, setActionsMenuAnchorEl] =
      useState<null | HTMLElement>(actionsMenuAnchorElRef.current);
    const [noteFileLink, setNoteFileLink] = useState<string>();
    const [getImageFileLink] = useImageLinkLazyQuery();

    useEffect(() => {
      void generateNoteFileLink();
      return () => {};
    }, [selectedGridItems]);

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

    const actions = [
      <Button
        variant={"text"}
        size={"small"}
        onClick={() => setSendSampleDialogOpen(true)}
        key="send-sample"
      >
        {`New ${sampleType == "fit" ? "fit" : "fabric"} sample`}
      </Button>,
      <RequireRole authorizedRoles={["Admin", "VChapman"]} key="deliver-sample">
        <Button
          variant="text"
          size="small"
          onClick={markAsDelivered}
          disabled={selectedSamples.length !== 1}
        >
          Mark As Delivered
        </Button>
      </RequireRole>,
      <RequireRole authorizedRoles={["Admin", "VChapman"]} key="approve-sample">
        <Button
          variant="text"
          size="small"
          onClick={approveSample}
          disabled={selectedSamples.length !== 1}
        >
          Approve
        </Button>
      </RequireRole>,
      <RequireRole authorizedRoles={["Admin", "VChapman"]} key="reject-sample">
        <Button
          variant="text"
          size="small"
          onClick={() => setRejectSampleDialogOpen(true)}
          disabled={selectedSamples.length !== 1}
        >
          Reject
        </Button>
      </RequireRole>,
      <Button
        href={noteFileLink ?? "#"}
        target="_blank"
        variant="text"
        size="small"
        disabled={
          selectedSamples.length !== 1 ||
          noteFileLink == "" ||
          noteFileLink == null
        }
        key="download-comment-attachment"
      >
        Download Comment Attachment
      </Button>,
    ];

    return (
      <GridToolbarContainer>
        <Box
          ref={actionsMenuAnchorElRef}
          sx={{ display: { xs: "inline", md: "none" } }}
        >
          <Button
            size="small"
            onClick={event => setActionsMenuAnchorEl(event.currentTarget)}
          >
            <MenuIcon sx={{ mr: 1 }} />
            <Typography variant="inherit">Actions</Typography>
          </Button>
          <ActionMenu
            anchorEl={actionsMenuAnchorEl}
            onClose={() => setActionsMenuAnchorEl(null)}
          >
            {actions}
          </ActionMenu>
        </Box>
        <Box sx={{ display: { xs: "none", md: "inline" } }}>
          {actions.map((item, index) => {
            return <Fragment key={index}>{item}</Fragment>;
          })}
        </Box>
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }
}
