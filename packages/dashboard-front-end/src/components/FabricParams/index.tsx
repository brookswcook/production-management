import { Button, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, Fragment, MouseEventHandler, useState } from "react";
import { useCreateFabricMutation } from "../../generated/graphql";
import GridToolbarButton from "../GridToolbarButton";
import AddIcon from "@mui/icons-material/Add";

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
            label="Color Code"
            name="colorCode"
            helperText="Example: color swatch 1345. If fabric has print leave it empty."
          />
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
