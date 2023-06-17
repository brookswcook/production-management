import {
  Stack,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Box,
} from "@mui/material";
import { FormEvent, ReactElement, useState } from "react";

import {
  CreateUserInput,
  useCreateUserMutation,
  useFactoriesQuery,
} from "../../../generated/graphql";
import { toast } from "react-toastify";
import { userRoles } from "dashboard-core";

export default function CreateUserForm({
  onCancel,
}: {
  onCancel?: VoidFunction;
}): ReactElement {
  const [role, setRole] = useState<string | null>(null);
  const { data: { factories } = { factories: [] } } = useFactoriesQuery();
  const [factoryId, setFactoryId] = useState<string | null>(null);
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
        variables: { data: { ...newUserData, companyId: factoryId } },
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
        options={userRoles}
        onChange={(_, value) => setRole(value)}
        renderInput={params => (
          <TextField {...params} name="role" label="Role" required />
        )}
      />
      {role === "Factory" && (
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
            <TextField {...params} label="Factory" required />
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
