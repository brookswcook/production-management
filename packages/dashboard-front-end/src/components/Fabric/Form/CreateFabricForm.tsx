import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import { FormEvent, ReactElement, useState } from "react";
import { ColorType } from "dashboard-core";
import FilePreload from "../../FilePreload";
import {
  CreateFabricInput,
  useCreateFabricMutation,
  useFabricLazyQuery,
  useFactoriesQuery,
} from "../../../generated/graphql";
import { toast } from "react-toastify";

export default function CreateFabricForm({
  onSubmit,
  id = "createFabric",
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  id?: string;
}): ReactElement {
  const [selectedColorType, setSelectedColorType] = useState<string>("");
  const [printFiles, setPrintFiles] = useState<File[] | null>(null);
  const { data: { factories } = { factories: [] } } = useFactoriesQuery();
  const [factoryId, setFactoryId] = useState<string | null>(null);
  const [newFabricMutation] = useCreateFabricMutation({
    refetchQueries: ["Fabrics"],
  });
  const [getFabric] = useFabricLazyQuery();
  const colorTypes: ColorType[] = ["solid", "print"];

  async function createNewFabric(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { code, title, colorName, colorCode } = Object.fromEntries(
      data.entries()
    ) as unknown as CreateFabricInput;

    try {
      if (factoryId == null) return toast.error("Factory should be selected");
      const { data: fabricData } = await getFabric({
        variables: { code },
      });
      if (fabricData?.fabric) {
        toast.info(
          `Fabric with ${code} code already exists. Choose another code`,
          { delay: 10 }
        );
      } else {
        const newFabricData: CreateFabricInput = {
          code,
          title,
          colorName,
          colorCode,
          factoryId,
          print: null,
          type: null,
        };
        if (printFiles) {
          newFabricData.print = printFiles.map(file => ({
            file,
            fileSize: file.size,
          }))[0];
        }
        await newFabricMutation({
          variables: { data: newFabricData },
        });
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
    onSubmit(event);
  }

  return (
    <Stack
      component="form"
      onSubmit={createNewFabric}
      spacing={2}
      autoComplete="off"
      id={id}
      sx={{ mt: 1 }}
    >
      <TextField
        label="Fabric Title"
        name="title"
        helperText="Example: Cotton organza in white rose print"
        required
      />
      <TextField
        label="Fabric Code"
        name="code"
        helperText="Example: K865"
        required
      />
      <Autocomplete
        onChange={(_, value) => setFactoryId(value?.id ?? null)}
        options={factories}
        getOptionLabel={option => option.name}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {`${option.name}`}
          </Box>
        )}
        renderInput={params => (
          <TextField {...params} name="factoryId" label="Factory" required />
        )}
      />
      <TextField
        label="Color Name"
        name="colorName"
        helperText="Example: Cinnamon Stick"
        required
      />
      <Autocomplete
        options={colorTypes}
        onChange={(_, value) => setSelectedColorType(String(value))}
        renderInput={params => (
          <TextField {...params} name="colorType" label="Color Type" required />
        )}
      />
      {selectedColorType === "solid" && (
        <TextField
          label="Color Code"
          name="colorCode"
          helperText="Example: color swatch 1345."
          required
        />
      )}
      {selectedColorType === "print" && (
        <FilePreload
          label="Print file"
          setFiles={setPrintFiles}
          helperText={"Please upload print file"}
          multiple={false}
        />
      )}
    </Stack>
  );
}
