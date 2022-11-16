import { ApolloError } from "@apollo/client";
import { Button, Stack, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useUploadTechPackMutation } from "../../generated/graphql";
import FilePreload from "../FilePreload";
import { PopperButton } from "../PopperButton";

export function UploadTechPackForm({ styleCode: code }: { styleCode: string }) {
  const [techPackFiles, setTechPackFiles] = useState<File[]>();
  const mutationOptions = {
    refetchQueries: ["Products", "Product"],
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
      spacing={2}
    >
      <Typography component="h4" variant="inherit">
        {`Upload tech pack for style ${code}`}
      </Typography>
      <FilePreload
        label="Tech Pack"
        setFiles={setTechPackFiles}
        helperText={
          "Important: it will override tech pack of all products based on given style"
        }
      />
      <Button variant="contained" type="submit">
        Upload
      </Button>
    </Stack>
  );
}

export function UploadTechPackPooperButton({
  disabled = false,
  styleCode,
}: {
  disabled?: boolean;
  styleCode: string;
}) {
  return (
    <PopperButton title="Upload TP" disabled={disabled}>
      <UploadTechPackForm styleCode={styleCode} />
    </PopperButton>
  );
}
