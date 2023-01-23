import { Stack, Typography, TextField, Button } from "@mui/material";
import { FormEvent, ReactElement, useState } from "react";
import { PopperButton } from "../../PopperButton";
import AddIcon from "@mui/icons-material/Add";
import {
  CreateCompanyInput,
  useCreateFactoryMutation,
} from "../../../generated/graphql";
import { toast } from "react-toastify";

export function CreateFactoryForm({
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

export function CreateFactoryPopperButton({
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
      title={"Add Factory"}
      disabled={disabled}
      closeSwitch={closeSwitch}
    >
      <CreateFactoryForm onCancel={closePopper} />
    </PopperButton>
  );
}
