import {
  Stack,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import { FormEvent, ReactElement, useEffect, useState } from "react";
import { PopperButton } from "../../PopperButton";
import AddIcon from "@mui/icons-material/Add";
import {
  CreateUserInput,
  useCreateUserMutation,
  useFactoryCodesLazyQuery,
} from "../../../generated/graphql";
import { toast } from "react-toastify";

export function CreateUserForm({
  onCancel,
}: {
  onCancel?: VoidFunction;
}): ReactElement {
  const [role, setRole] = useState<string | null>(null);
  const [factoryCodes, setFactoryCodes] = useState<string[]>([]);
  const [newUserMutation] = useCreateUserMutation({
    refetchQueries: ["Users"],
  });
  const [getFactoryCodes] = useFactoryCodesLazyQuery();
  async function updateFactoryCodes() {
    const { data } = await getFactoryCodes();
    if (data != null) {
      const factoryCodes = data.factories.map(({ code }) => code);
      setFactoryCodes(factoryCodes);
    }
  }

  useEffect(() => {
    if (role === "Factory") void updateFactoryCodes();
  }, [role]);

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
      <Autocomplete
        options={["Factory", "VChapman", "Admin"]}
        onChange={(_, value) => setRole(value)}
        renderInput={params => (
          <TextField {...params} name="role" label="Role" required />
        )}
      />
      {role === "Factory" && (
        <Autocomplete
          options={factoryCodes}
          renderInput={params => (
            <TextField
              {...params}
              name="factoryCode"
              label="FactoryCode"
              required
            />
          )}
        />
      )}
      <>
        <Button variant="contained" type="submit">
          Add User
        </Button>
        <Button variant="contained" onClick={onCancel}>
          Cancel
        </Button>
      </>
    </Stack>
  );
}

// If factory option selected add dropdown of available factories then apply Factory:FactoryCode to the user role
// Add Factory entity; it should has a list of users who represent this factory

// Review current entities which support factory to show only related records
// Add Factory to the style; maybe it requires some interface like FactorySupportEntity or smth

// separated actions to mark delivered and approved/rejected. delivered is set by factory

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
