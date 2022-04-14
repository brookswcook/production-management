import { Button, Stack, TextField } from "@mui/material";
import { FormEvent } from "react";

export default function TechPackParams({
  productCode,
}: {
  productCode?: string;
}) {
  function uploadTechPack(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data, productCode);
  }

  return (
    <Stack
      component="form"
      autoComplete="off"
      onSubmit={uploadTechPack}
      spacing={2}
    >
      <TextField label="Tech pack url" name="techPackUrl" required />
      <Button variant="contained" type="submit">
        Upload
      </Button>
    </Stack>
  );
}
