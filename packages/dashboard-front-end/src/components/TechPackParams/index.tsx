import { ApolloError } from "@apollo/client";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useUploadTechPackMutation } from "../../generated/graphql";
import GridToolbarButton from "../GridToolbarButton";

export default function TechPackParams({
  styleCode: code,
}: {
  styleCode: string;
}) {
  const [techPackFile, setTechPackFile] = useState<File>();
  const mutationOptions = {
    refetchQueries: ["Products", "Product"],
  };
  const [uploadTechPackMutation] = useUploadTechPackMutation(mutationOptions);

  async function uploadTechPack(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (techPackFile) {
        await uploadTechPackMutation({
          variables: {
            data: {
              code,
              techPack: { file: techPackFile, fileSize: techPackFile.size },
            },
          },
        });
      }
    } catch (error) {
      toast.error((error as ApolloError).message);
    }
  }

  function onTechPackInputChange({
    target: {
      files,
      validity: { valid },
    },
  }: ChangeEvent<HTMLInputElement>) {
    const file = files?.item(0) ?? null;
    if (valid && file) setTechPackFile(file);
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
      <TextField
        variant="standard"
        label="Tech Pack"
        type="file"
        helperText={`Important: it will override tech pack of all products based on given style`}
        onChange={onTechPackInputChange}
        required
      />
      <Button variant="contained" type="submit">
        Upload
      </Button>
    </Stack>
  );
}

export function UploadTechPackToolbarButton({
  disabled = false,
  styleCode,
}: {
  disabled?: boolean;
  styleCode: string;
}) {
  return (
    <GridToolbarButton
      icon={<Fragment />}
      title="Upload TP"
      disabled={disabled}
    >
      <TechPackParams styleCode={styleCode} />
    </GridToolbarButton>
  );
}
