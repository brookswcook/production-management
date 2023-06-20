import { ApolloError } from "@apollo/client";
import { TextField, Stack } from "@mui/material";
import { SampleType } from "dashboard-core";
import { FormEvent, ReactElement } from "react";
import { toast } from "react-toastify";
import {
  SendSampleInput,
  useSendFabricSampleMutation,
  useSendFitSampleMutation,
} from "../../../generated/graphql";

export default function SendSampleForm({
  onSubmit,
  parentCode,
  sampleType,
  id = "sendSampleForm",
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  parentCode: string;
  sampleType: SampleType;
  id?: string;
}): ReactElement {
  const mutationOptions = {
    refetchQueries: ["Products", "Product", "ActionLogs"],
  };
  const [sendFabricSampleMutation] =
    useSendFabricSampleMutation(mutationOptions);
  const [sendFitSampleMutation] = useSendFitSampleMutation(mutationOptions);

  const sendSampleMutation =
    sampleType === "fit" ? sendFitSampleMutation : sendFabricSampleMutation;

  async function sendSample(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputData = Object.fromEntries(data.entries()) as Omit<
      SendSampleInput,
      "parentCode"
    >;
    try {
      await sendSampleMutation({
        variables: { data: { parentCode, ...inputData } },
      });
    } catch (error) {
      toast.error((error as ApolloError).message);
    }
    onSubmit(event);
  }

  return (
    <Stack
      component="form"
      onSubmit={sendSample}
      spacing={2}
      autoComplete="off"
      id={id}
    >
      <TextField label="SKU" name="sku" required sx={{ mt: 1 }} />
      <TextField label="Track Number" name="trackNumber" required />
    </Stack>
  );
}
