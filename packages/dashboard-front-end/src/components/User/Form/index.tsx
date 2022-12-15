import { Stack, Typography, TextField, Button } from "@mui/material";
import { FormEvent, Fragment, ReactElement, useState } from "react";
import { PopperButton } from "../../PopperButton";
import AddIcon from "@mui/icons-material/Add";
import {
  CreateUserInput,
  useCreateUserMutation,
} from "../../../generated/graphql";
import { toast } from "react-toastify";

export function CreateUserForm({
  onCancel,
}: {
  onCancel?: VoidFunction;
}): ReactElement {
  const [newUserMutation] = useCreateUserMutation({
    refetchQueries: ["Users"],
  });

  async function createNewUser(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newUserData = Object.fromEntries(
      data.entries()
    ) as unknown as CreateUserInput;

    try {
      await newUserMutation({
        variables: { data: newUserData },
      });
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

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
