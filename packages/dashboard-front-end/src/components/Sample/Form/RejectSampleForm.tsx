import { ApolloError } from "@apollo/client";
import { Stack, TextField } from "@mui/material";
import { SampleType, NoteType } from "dashboard-core";
import { FormEvent, useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import {
  useRejectFitSampleMutation,
  useCreateNoteMutation,
  useRejectFabricSampleMutation,
  RejectFitSampleMutation,
  RejectFabricSampleMutation,
  CreateNoteInput,
  FileUploadInput,
} from "../../../generated/graphql";

export default function RejectSampleForm({
  onSubmit,
  parentCode,
  sampleType,
  sku,
  id = "rejectSample",
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  parentCode: string;
  sampleType: SampleType;
  sku: string;
  id?: string;
}) {
  const [rejectionText, setRejectionText] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<FileList>();

  const refetchPolicy = {
    refetchQueries: ["Fabrics", "ActionLogs", "Products", "Fabric", "Product"],
  };

  const [rejectFitSampleMutation] = useRejectFitSampleMutation(refetchPolicy);
  const [createNoteMutation] = useCreateNoteMutation(refetchPolicy);
  const [rejectFabricSampleMutation] =
    useRejectFabricSampleMutation(refetchPolicy);

  function onImagesInputChange({
    target: {
      files,
      validity: { valid },
    },
  }: ChangeEvent<HTMLInputElement>) {
    if (valid && files) setImageFiles(files);
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
            sku,
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
    onSubmit(event);
  }

  return (
    <Stack
      component="form"
      onSubmit={rejectSample}
      spacing={2}
      autoComplete="off"
      id={id}
      sx={{ mt: 1 }}
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
    </Stack>
  );
}
