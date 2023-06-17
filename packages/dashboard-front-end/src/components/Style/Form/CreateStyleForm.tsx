import { Button, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, ReactElement, useState } from "react";
import {
  CreateStyleInput,
  useCreateStyleMutation,
  useStyleLazyQuery,
} from "../../../generated/graphql";
import { toast } from "react-toastify";
import FilePreload from "../../FilePreload";

export default function CreateStyleForm({
  footerEl,
}: {
  footerEl?: ReactElement;
}): ReactElement {
  const [getStyle] = useStyleLazyQuery();
  const [newStyleMutation] = useCreateStyleMutation({
    refetchQueries: ["Styles"],
  });
  const [techPackFiles, setTechPackFiles] = useState<File[] | null>(null);

  async function createNewStyle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { code, name } = Object.fromEntries(
      data.entries()
    ) as unknown as CreateStyleInput;

    try {
      const { data: styleData } = await getStyle({
        variables: { code },
      });
      if (styleData?.style) {
        toast.info(
          `Style with ${code} number already exists. Choose another code`,
          { delay: 10 }
        );
      } else {
        const newStyleData: CreateStyleInput = {
          code,
          name,
          techPack: null,
        };
        if (techPackFiles) {
          newStyleData.techPack = techPackFiles.map(file => ({
            file,
            fileSize: file.size,
          }));
        }
        await newStyleMutation({
          variables: { data: newStyleData },
        });
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Stack
      component="form"
      onSubmit={createNewStyle}
      spacing={2}
      autoComplete="off"
    >
      <Typography component="h4" variant="inherit">
        {`Create new Style`}
      </Typography>
      <TextField
        label="Style number"
        name="code"
        helperText="Example: VD-193"
        required
      />
      <TextField
        label="Style name"
        name="name"
        helperText="Example: The Mia Dress"
        required
      />
      <FilePreload
        label="Print file"
        setFiles={setTechPackFiles}
        helperText={"You can upload tech pack now or later"}
        multiple={true}
      />
      <>
        <Button variant="contained" type="submit">
          Add Style
        </Button>
        {footerEl}
      </>
    </Stack>
  );
}
