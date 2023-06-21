import { Stack, TextField } from "@mui/material";
import { FormEvent, ReactElement } from "react";
import {
  CreateCompanyInput,
  useCreateFactoryMutation,
} from "../../../generated/graphql";
import { toast } from "react-toastify";

export default function CreateFactoryForm({
  onSubmit,
  id = "createFactory",
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  id?: string;
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
    onSubmit(event);
  }

  return (
    <Stack
      component="form"
      onSubmit={createNewFactory}
      spacing={2}
      autoComplete="off"
      id={id}
      sx={{ mt: 1 }}
    >
      <TextField label="Name" name="name" required />
      <TextField label="Address" name="address" required />
    </Stack>
  );
}
