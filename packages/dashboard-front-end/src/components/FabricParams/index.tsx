import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, Fragment, useState } from "react";
import GridToolbarButton from "../GridToolbarButton";
import AddIcon from "@mui/icons-material/Add";
import { ColorType } from "dashboard-core";

export default function CreateFabricButton({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  const [cancelleCount, setCancelledCount] = useState<number>(0);
  function cancel() {
    setCancelledCount(cancelleCount + 1);
  }

  async function createNewFabric(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await Promise.resolve("");
    console.log(data);
  }

  const colorTypes: ColorType[] = ["print", "solid"];

  return (
    <Fragment>
      <GridToolbarButton
        icon={<AddIcon />}
        title={"Add Fabric"}
        disabled={disabled}
        closeCounter={cancelleCount}
      >
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
              },
            }}
            required
          >
            {colorTypes.map(colorType => (
              <MenuItem value={colorType}>{colorType}</MenuItem>
            ))}
          </TextField>
          <Fragment>
            <Button variant="contained" type="submit">
              Add Fabric
            </Button>
            <Button variant="contained" onClick={cancel}>
              Cancel
            </Button>
          </Fragment>
        </Stack>
      </GridToolbarButton>
    </Fragment>
  );
}
