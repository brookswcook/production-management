import { ApolloError } from "@apollo/client";
import {
  Button,
  ButtonPropsVariantOverrides,
  Stack,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useUploadTechPackMutation } from "../../generated/graphql";
import FilePreload from "../FilePreload";
import { PopperButton } from "../PopperButton";
import { OverridableStringUnion } from "@mui/types";

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
  variant = "text",
}: {
  disabled?: boolean;
  styleCode: string;
  variant?: OverridableStringUnion<
    "text" | "outlined" | "contained",
    ButtonPropsVariantOverrides
  >;
}) {
  return (
    <PopperButton
      variant={variant}
      title="Upload Tech Pack"
      disabled={disabled}
    >
      <UploadTechPackForm styleCode={styleCode} />
    </PopperButton>
  );
}
