import { Stack, Typography, TextField, Button } from "@mui/material";
import { Fragment, ReactElement, useState } from "react";
import { PopperButton } from "../../PopperButton";
import AddIcon from "@mui/icons-material/Add";

export function CreateUserForm({
  onCancel,
}: {
  onCancel?: VoidFunction;
}): ReactElement {
  function createNewUser() {}

  return (
    <Stack
      component="form"
      onSubmit={createNewUser}
      spacing={2}
      autoComplete="off"
    >
      <Typography component="h4" variant="inherit">
        {`Create new User`}
      </Typography>
      <TextField label="Email" name="email" required />
      <TextField label="First name" name="firstName" required />
      <TextField label="Last name" name="lastName" required />
      <TextField label="Role" name="role" required />
      <Fragment>
        <Button variant="contained" type="submit">
          Add User
        </Button>
        <Button variant="contained" onClick={onCancel}>
          Cancel
        </Button>
      </Fragment>
    </Stack>
  );
}

export function CreateUserPopperButton({
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
      title={"Add User"}
      disabled={disabled}
      closeSwitch={closeSwitch}
    >
      <CreateUserForm onCancel={closePopper} />
    </PopperButton>
  );
}
