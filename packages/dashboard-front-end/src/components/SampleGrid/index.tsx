import { ApolloError } from "@apollo/client";
import { Box, Button, Stack, TextField } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  CreateNoteInput,
  FileUploadInput,
  RejectFabricSampleMutation,
  RejectFitSampleMutation,
  Sample,
  useApproveFabricSampleMutation,
  useApproveFitSampleMutation,
  useCreateNoteMutation,
  useImageLinkLazyQuery,
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
  const [createNoteMutation] = useCreateNoteMutation(refetchPolicy);

  // TODO: reuse it since there's a similar thing in ProductGrid
  const selectedSampleSkus = Array.from(selectedGridItems.values());
  const selectedSamples = rows.filter(row =>
    selectedSampleSkus.some(sku => row.sku == sku)
  );

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
                variant="standard"
                label="Rejection comment"
                name="styleCode"
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
          </GridToolbarButton>
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
              Download Attachment
            </Button>
          </a>
        </GridToolbarContainer>
      </Fragment>
    );
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
            type: "sampleRejectionComment",
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
