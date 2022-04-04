import { ApolloError } from "@apollo/client";
import { Stack, FormControl, InputLabel, Input, Button } from "@mui/material";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import {
  SendSampleInput,
  useSendFabricSampleMutation,
} from "../../generated/graphql";

export function SendSampleParams({ productName }: { productName?: string }) {
  const [sendFabricSampleMutation] = useSendFabricSampleMutation({
    refetchQueries: ["Products"],
  });

  async function sendFabricSample(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (productName == null) return;
    const inputData = Object.fromEntries(data.entries()) as Omit<
      SendSampleInput,
      "productName"
    >;
    try {
      await sendFabricSampleMutation({
        variables: { data: { productName, ...inputData } },
      });
    } catch (error) {
      toast.error((error as ApolloError).message);
    }
  }

  return (
    <Stack
      component="form"
      onSubmit={sendFabricSample}
      spacing={2}
      autoComplete="off"
    >
      <FormControl>
        <InputLabel htmlFor="sku-input">SKU</InputLabel>
        <Input name="sku" id="sku-input" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="track-number-input">Track Number</InputLabel>
        <Input name="trackNumber" id="track-number-input" />
      </FormControl>
      <Button variant="contained" type="submit">
        Send
      </Button>
    </Stack>
  );
}
