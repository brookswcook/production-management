import { ApolloError } from "@apollo/client";
import { Box, Button, Stack, TextField } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { NoteType } from "dashboard-core";
import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import {
  Sample,
  useApproveFitSampleMutation,
  useRejectFitSampleMutation,
  useMarkFitSampleAsDeliveredMutation,
  useApproveFabricSampleMutation,
  useRejectFabricSampleMutation,
  useMarkFabricSampleAsDeliveredMutation,
  useCreateNoteMutation,
  useImageLinkLazyQuery,
  RejectFitSampleMutation,
  RejectFabricSampleMutation,
  CreateNoteInput,
  FileUploadInput,
} from "../../../generated/graphql";
import RequireRole from "../../Auth/RequireRole";
import { renderCellExpand } from "../../ListView";
import PopperButton from "../../PopperButton";
import SendSamplePopperButton from "../Popper/SendSamplePopperButton";

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
  const [approveFitSampleMutation] = useApproveFitSampleMutation(refetchPolicy);
  const [rejectFitSampleMutation] = useRejectFitSampleMutation(refetchPolicy);

  const [markFitSampleAsDelivered] =
    useMarkFitSampleAsDeliveredMutation(refetchPolicy);
  const [approveFabricSampleMutation] =
    useApproveFabricSampleMutation(refetchPolicy);
  const [rejectFabricSampleMutation] =
    useRejectFabricSampleMutation(refetchPolicy);
  const [markFabricSampleAsDelivered] =
    useMarkFabricSampleAsDeliveredMutation(refetchPolicy);
  const [createNoteMutation] = useCreateNoteMutation(refetchPolicy);

  // TODO: reuse it since there's a similar thing in ProductGrid
  const selectedSampleSkus = Array.from(selectedGridItems.values());
  const selectedSamples = rows.filter(row =>
    selectedSampleSkus.some(sku => row.sku == sku)
  );

  const columns: GridColDef<Sample>[] = [
    { field: "sku", headerName: "Sample Number", type: "string", flex: 1 },
    {
      field: "trackNumber",
      headerName: "Tracking Number",
      type: "string",
      flex: 1,
    },
    { field: "delivered", headerName: "Delivered", type: "boolean", flex: 1 },
    { field: "approved", headerName: "Approved", type: "boolean", flex: 1 },
    {
      field: "attachment",
      headerName: "Comment Attachment",
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
      field: "comment",
      headerName: "Rejection Comment",
      type: "string",
      flex: 3,
      renderCell: renderCellExpand,
      valueGetter: ({ row }: { row: Sample }) => {
        return row.note?.text ?? "";
      },
    },
    {
      field: "commentAuthor",
      headerName: "Comment author",
      type: "string",
      flex: 1,
      valueGetter: ({ row }: { row: Sample }) => {
        return row.note?.user?.fullName;
      },
    },
    {
      field: "commentDate",
      headerName: "Comment date",
      type: "date",
      flex: 1,
      valueGetter: ({ row }: { row: Sample }) => {
        if (row.note?.createdAt == null) return "";
        return new Date(row.note?.createdAt).toLocaleDateString();
      },
    },
  ];

  return (
    <Box sx={{ height: "300px", width: "100%", pt: 1 }}>
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
    const [rejectionText, setRejectionText] = useState<string>("");
    const [imageFiles, setImageFiles] = useState<FileList>();
    const [noteFileLink, setNoteFileLink] = useState<string>();
    const [getImageFileLink] = useImageLinkLazyQuery();

    useEffect(() => {
      void generateNoteFileLink();
      return () => {};
    }, [selectedGridItems]);

    function onImagesInputChange({
      target: {
        files,
        validity: { valid },
      },
    }: ChangeEvent<HTMLInputElement>) {
      if (valid && files) setImageFiles(files);
    }

    return (
      <>
        <GridToolbarContainer>
          <SendSamplePopperButton
            sampleType={sampleType}
            parentCode={parentCode}
          />
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
            <PopperButton
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
                  variant="standard"
                  label="Rejection comment"
                  onChange={({ target: { value } }) => {
                    setRejectionText(value);
                  }}
                  required
                />
                <TextField
                  variant="standard"
                  label="Images"
                  type="file"
                  helperText="Images associated with rejection comment. Put them in archive if you want to upload more than one image"
                  onChange={onImagesInputChange}
                />
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Stack>
            </PopperButton>
          </RequireRole>
          <a
            href={noteFileLink}
            target="_blank"
            style={{
              pointerEvents: `${selectedSamples.length == 1 ? "auto" : "none"}`,
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

    async function rejectSample(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      try {
        const { data: rejectSampleMutationResult } = await (sampleType == "fit"
          ? rejectFitSampleMutation
          : rejectFabricSampleMutation)({
          variables: {
            data: {
              parentCode,
              sku: selectedSamples[0].sku ?? "",
            },
          },
        });
        if (rejectSampleMutationResult != null) {
          const { id: parentId } =
            sampleType == "fit"
              ? (rejectSampleMutationResult as RejectFitSampleMutation)
                  .rejectFitSample
              : (rejectSampleMutationResult as RejectFabricSampleMutation)
                  .rejectFabricSample;
          const newNoteData = {
            parentId,
            text: rejectionText,
            type: "sampleRejectionComment" as NoteType,
            images: [],
          } as CreateNoteInput & { images: FileUploadInput[] };

          if (imageFiles) {
            for (let i = 0; i < imageFiles.length; i++) {
              newNoteData.images.push({
                file: imageFiles[i],
                fileSize: imageFiles[i].size,
              });
            }
          }

          await createNoteMutation({
            variables: {
              data: newNoteData,
            },
          });
        }
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
