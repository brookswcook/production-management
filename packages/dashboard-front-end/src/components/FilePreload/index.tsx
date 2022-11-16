import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

export default function FilePreload({
  label,
  setFiles,
  helperText,
  multiple = true,
}: {
  label: string;
  setFiles: (files: File[]) => void;
  helperText?: string;
  multiple?: boolean;
}) {
  function onInputChange({
    target: {
      files: filesList,
      validity: { valid },
    },
  }: ChangeEvent<HTMLInputElement>) {
    if (valid && filesList != null && filesList.length > 0) {
      const files = [];
      for (let i = 0; i < filesList.length; i++) {
        const file = filesList.item(i);
        if (file != null) files.push(file);
      }
      setFiles(files);
    }
  }

  return (
    <TextField
      variant="standard"
      label={label}
      type="file"
      helperText={helperText}
      onChange={onInputChange}
      inputProps={{
        multiple,
      }}
      required
    />
  );
}
