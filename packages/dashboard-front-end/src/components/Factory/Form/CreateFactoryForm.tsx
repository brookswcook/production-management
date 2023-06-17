import { Stack, Typography, TextField, Button } from "@mui/material";
import { FormEvent, ReactElement } from "react";
import {
  CreateCompanyInput,
  useCreateFactoryMutation,
} from "../../../generated/graphql";
import { toast } from "react-toastify";

export default function CreateFactoryForm({
  onCancel,
}: {
  onCancel?: VoidFunction;
}): ReactElement {
  const [newFactoryMutation] = useCreateFactoryMutation({
    refetchQueries: ["Factories"],
  });

  async function createNewFactory(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newFactoryData = Object.fromEntries(
      data.entries()
    ) as unknown as CreateCompanyInput;

    try {
      await newFactoryMutation({
        variables: { data: newFactoryData },
      });
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Stack
      component="form"
      onSubmit={createNewFactory}
      spacing={2}
      autoComplete="off"
    >
      <Typography component="h4" variant="inherit">
        {`Create new Factory`}
      </Typography>
      <TextField label="Name" name="name" required />
      <TextField label="Address" name="address" required />
      {/* <TextField label="Email" name="email" required /> */}
      <>
        <Button variant="contained" type="submit">
          Add Factory
        </Button>
        <Button variant="contained" onClick={onCancel}>
          Cancel
        </Button>
      </>
    </Stack>
  );
}
