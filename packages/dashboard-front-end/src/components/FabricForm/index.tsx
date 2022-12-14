import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, Fragment, ReactElement, useState } from "react";
import { PopperButton } from "../PopperButton";
import AddIcon from "@mui/icons-material/Add";
import { ColorType } from "dashboard-core";
import FilePreload from "../FilePreload";
import {
  CreateFabricInput,
  useCreateFabricMutation,
  useFabricLazyQuery,
} from "../../generated/graphql";
import { toast } from "react-toastify";

export function CreateFabricForm({
  footerEl,
}: {
  footerEl?: ReactElement;
}): ReactElement {
  const [selectedColorType, setSelectedColorType] = useState<string>("");
  const [printFiles, setPrintFiles] = useState<File[] | null>(null);
  const [newFabricMutation] = useCreateFabricMutation({
    refetchQueries: ["Fabrics"],
  });
  const [getFabric] = useFabricLazyQuery();
  const colorTypes: ColorType[] = ["solid", "print"];

  async function createNewFabric(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { code, title, factoryName, colorName, colorCode } =
      Object.fromEntries(data.entries()) as unknown as CreateFabricInput;

    try {
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
          factoryName,
          colorName,
          colorCode,
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
  }

  return (
    <Stack
      component="form"
      onSubmit={createNewFabric}
      spacing={2}
      autoComplete="off"
    >
      <Typography component="h4" variant="inherit">
        {`Create new Fabric`}
      </Typography>
      <TextField
        label="Fabric Title"
        name="title"
        helperText="Example: Cotton organza in white rose print"
        required
      />
      <Autocomplete
        options={["Amy", "Kevin"]}
        renderInput={params => (
          <TextField {...params} name="factoryName" label="Factory" required />
        )}
      />
      <TextField
        label="Fabric Code"
        name="code"
        helperText="Example: K865"
        required
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
          helperText={"Please upload tiff file"}
          multiple={false}
        />
      )}
      <Fragment>
        <Button variant="contained" type="submit">
          Add Fabric
        </Button>
        {footerEl}
      </Fragment>
    </Stack>
  );
}

export function CreateFabricPopperButton({
  disabled = false,
}: {
  disabled?: boolean;
}): ReactElement {
  const [closeSwitch, setCloseSwitch] = useState(0);
  function closePopper() {
    setCloseSwitch(closeSwitch + 1);
  }

  return (
    <PopperButton
      icon={<AddIcon />}
      title={"Add Fabric"}
      disabled={disabled}
      closeSwitch={closeSwitch}
    >
      <CreateFabricForm
        footerEl={
          <Button variant="contained" onClick={closePopper}>
            Cancel
          </Button>
        }
      />
    </PopperButton>
  );
}
