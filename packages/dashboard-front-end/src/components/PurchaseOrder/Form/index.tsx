import { ApolloError } from "@apollo/client";
import { DatePicker } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { FormEvent, ReactElement, useState } from "react";
import { toast } from "react-toastify";
import {
  CreatePurchaseOrderInput,
  useCreatePurchaseOrderMutation,
  useFactoriesQuery,
} from "../../../generated/graphql";
import { PopperButton } from "../../PopperButton";
import AddIcon from "@mui/icons-material/Add";

export function CreatePurchaseOrderForm({
  footerEl,
}: {
  footerEl?: ReactElement;
}) {
  const [newPurchaseOrderMutation] = useCreatePurchaseOrderMutation({
    refetchQueries: ["PurchaseOrders"],
  });

  const { data: { factories } = { factories: [] } } = useFactoriesQuery();
  const [expectedDeliveryDate, setDeliveryDate] = useState<string>(
    new Date().toISOString()
  );

  async function createNewPurchaseOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { factoryId } = Object.fromEntries(
      data.entries()
    ) as unknown as CreatePurchaseOrderInput;
    try {
      await newPurchaseOrderMutation({
        variables: {
          data: { factoryId: String(factoryId), expectedDeliveryDate },
        },
      });
    } catch (error) {
      toast.error((error as ApolloError).message);
    }
  }

  return (
    <Stack
      component="form"
      onSubmit={createNewPurchaseOrder}
      spacing={2}
      autoComplete="off"
    >
      {" "}
      <Typography component="h4" variant="inherit">
        {`Create new Purchase Order`}
      </Typography>
      <Autocomplete
        options={factories}
        getOptionLabel={option => option.id}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {`${option.name}`}
          </Box>
        )}
        renderInput={params => (
          <TextField {...params} name="factoryId" label="Factory" required />
        )}
      />
      <DatePicker
        label="Expected delivery date"
        value={expectedDeliveryDate}
        onChange={newValue => {
          setDeliveryDate(newValue as string);
        }}
        renderInput={(params: TextFieldProps) => (
          <TextField name="Expected delivery date" {...params} required />
        )}
      />
      <>
        <Button variant="contained" type="submit">
          Create
        </Button>
        {footerEl}
      </>
    </Stack>
  );
}

export function CreatePurchaseOrderPopperButton({
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
      title={"Add Purchase Order"}
      disabled={disabled}
      closeSwitch={closeSwitch}
      closeOnClickAway={false}
    >
      <CreatePurchaseOrderForm
        footerEl={
          <Button variant="contained" onClick={closePopper}>
            Cancel
          </Button>
        }
      />
    </PopperButton>
  );
}
