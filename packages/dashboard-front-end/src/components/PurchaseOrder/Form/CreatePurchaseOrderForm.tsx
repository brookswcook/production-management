import { ApolloError } from "@apollo/client";
import { DatePicker } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Stack,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import {
  useCreatePurchaseOrderMutation,
  useFactoriesQuery,
} from "../../../generated/graphql";

export default function CreatePurchaseOrderForm({
  onSubmit,
  id = "createPurchaseOrder",
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  id?: string;
}) {
  const [newPurchaseOrderMutation] = useCreatePurchaseOrderMutation({
    refetchQueries: ["PurchaseOrders"],
  });

  const { data: { factories } = { factories: [] } } = useFactoriesQuery();
  const [factoryId, setFactoryId] = useState<string | null>(null);
  const [expectedDeliveryDate, setDeliveryDate] = useState<string>(
    new Date().toISOString()
  );

  async function createNewPurchaseOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (factoryId == null) return toast.error("Factory should be selected");
      await newPurchaseOrderMutation({
        variables: {
          data: { factoryId, expectedDeliveryDate },
        },
      });
    } catch (error) {
      toast.error((error as ApolloError).message);
    }
    onSubmit(event);
  }

  return (
    <Stack
      component="form"
      onSubmit={createNewPurchaseOrder}
      spacing={2}
      autoComplete="off"
      id={id}
      sx={{ mt: 1 }}
    >
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
    </Stack>
  );
}
