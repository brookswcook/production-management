import { Stack, FormControl, InputLabel, Input, Button } from "@mui/material";
import { useSendFabricSampleMutation } from "../../generated/graphql";

export function SendSampleParams({ productName }: { productName?: string }) {
  // const [sendFabricSampleMutation] = useSendFabricSampleMutation({
  //   refetchQueries: ["Products"],
  // });

  function sendFitSample() {}

  return (
    <Stack component="form" onSubmit={sendFitSample} spacing={2}>
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
