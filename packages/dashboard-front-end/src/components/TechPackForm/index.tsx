import { ApolloError } from "@apollo/client";
import { Stack } from "@mui/material";
import { FormEvent, ReactElement, useState } from "react";
import { toast } from "react-toastify";
import { useUploadTechPackMutation } from "../../generated/graphql";
import FilePreload from "../FilePreload";

import { ActionDialog } from "../Common/ActionDialog";

export function UploadTechPackForm({
  styleCode: code,
  onSubmit = () => {},
}: {
  styleCode: string;
  onSubmit?: () => void;
}): ReactElement {
  const [techPackFiles, setTechPackFiles] = useState<File[]>();
  const mutationOptions = {
    refetchQueries: ["Style", "ActionLogs"],
  };
  const [uploadTechPackMutation] = useUploadTechPackMutation(mutationOptions);

  async function uploadTechPack(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (techPackFiles) {
        await uploadTechPackMutation({
          variables: {
            data: {
              code,
              techPack: techPackFiles.map(file => ({
                file,
                fileSize: file.size,
              })),
            },
          },
        });
        onSubmit();
      }
    } catch (error) {
      toast.error((error as ApolloError).message);
    }
  }

  return (
    <Stack
      component="form"
      autoComplete="off"
      onSubmit={uploadTechPack}
      id="uploadTechPackForm"
      spacing={2}
    >
      <FilePreload label="Tech Pack" setFiles={setTechPackFiles} />
    </Stack>
  );
}

export function UploadTechPackDialog({
  styleCode,
  open = false,
  onSave = () => {},
  onClose = () => {},
}: {
  styleCode: string;
  open?: boolean;
  onSave?: () => void;
  onClose?: () => void;
}) {
  return (
    <ActionDialog
      title="Upload tech pack"
      open={open}
      onClose={onClose}
      form="uploadTechPackForm"
    >
      <UploadTechPackForm styleCode={styleCode} onSubmit={onSave} />
    </ActionDialog>
  );
}
