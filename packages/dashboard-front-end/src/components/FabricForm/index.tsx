import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, Fragment, ReactElement, useState } from "react";
import { PopperButton } from "../PopperButton";
import AddIcon from "@mui/icons-material/Add";
import { ColorType } from "dashboard-core";
import FilePreload from "../FilePreload";

export function CreateFabricForm({ footerEl }: { footerEl?: ReactElement }) {
  const [selectedColorType, setSelectedColorType] = useState<ColorType>();
  const [printFiles, setPrintFiles] = useState<File[] | null>(null);

  async function createNewFabric(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await Promise.resolve("");
    console.log(data);
  }

  const colorTypes: ColorType[] = ["solid", "print"];

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
        label="Fabric Code"
        name="fabricCode"
        helperText="Example: K865"
        required
      />
      <TextField
        label="Color Name"
        name="colorName"
        helperText="Example: Cinnamon Stick"
        required
      />
      <TextField
        select
        label="Color Type"
        name="colorType"
        SelectProps={{
          MenuProps: {
            disablePortal: true,
            // TODO: Find better option to set correct position of it
            sx: {
              ".MuiPaper-root": {
                left: "0 !important;",
                position: "sticky",
              },
            },
          },
        }}
        onChange={e => setSelectedColorType(e.target.value as ColorType)}
        required
      >
        {colorTypes.map(colorType => (
          <MenuItem key={colorType} value={colorType}>
            {`${colorType[0].toUpperCase()}${colorType.slice(1)}`}
          </MenuItem>
        ))}
      </TextField>
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
          helperText={"Please upload file (.tiff or another)"}
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
}) {
  const [closeCount, setCloseCount] = useState<number>(0);
  function cancel() {
    setCloseCount(closeCount + 1);
  }
  return (
    <PopperButton
      icon={<AddIcon />}
      title={"Add Fabric"}
      disabled={disabled}
      popperCloseCounter={closeCount}
    >
      <CreateFabricForm
        footerEl={
          <Button variant="contained" onClick={cancel}>
            Cancel
          </Button>
        }
      />
    </PopperButton>
  );
}
