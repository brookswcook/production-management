import { ApolloError } from "@apollo/client";
import {
  Stack,
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
} from "@mui/material";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import {
  SendSampleInput,
  useSendFabricSampleMutation,
  useSendFitSampleMutation,
} from "../../generated/graphql";
import { PopperButton } from "../PopperButton";

export function SendSampleForm({
  parentCode,
  sampleType,
}: {
  parentCode: string;
  sampleType: SampleType;
}) {
  const mutationOptions = {
    refetchQueries: ["Products", "Product"],
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
  }

  return (
    <Stack
      component="form"
      onSubmit={sendSample}
      spacing={2}
      autoComplete="off"
    >
      <Typography component="h4" variant="inherit">
        {`Send ${sampleType === "fit" ? "fit" : "fabric"} sample`}
      </Typography>
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

export default function SendSamplePopperButton({
  disabled = false,
  sampleType,
  parentCode,
}: {
  disabled?: boolean;
  sampleType: SampleType;
  parentCode: string;
}) {
  return (
    <PopperButton
      title={`Send ${sampleType == "fit" ? "FIS" : "FAS"}`}
      disabled={disabled}
    >
      <SendSampleForm parentCode={parentCode} sampleType={sampleType} />
    </PopperButton>
  );
}

export type SampleType = "fit" | "fabric";
