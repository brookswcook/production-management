import { FormEvent, useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import {
  CreateProductInput,
  useCreateProductMutation,
} from "../../generated/graphql";
import { toast } from "react-toastify";
import { ApolloError } from "@apollo/client";

export default function ProductParams() {
  const [newProductMutation] = useCreateProductMutation({
    refetchQueries: ["Products"],
  });

  const [deliveryDate, setDeliveryDate] = useState<string>("");

  async function createNewProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputData = Object.fromEntries(data.entries()) as CreateProductInput;
    try {
      await newProductMutation({
        variables: { data: { ...inputData } },
      });
    } catch (error) {
      toast.error((error as ApolloError).message);
    }
  }

  return (
    <Stack
      component="form"
      onSubmit={createNewProduct}
      spacing={2}
      autoComplete="off"
    >
      <FormControl>
        <InputLabel htmlFor="model-input">Model</InputLabel>
        <Input name="model" id="model-input" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="style-input">Style</InputLabel>
        <Input name="style" id="style-input" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="sku-input">SKU</InputLabel>
        <Input name="sku" id="sku-input" />
      </FormControl>
      <DatePicker
        label="Delivery Date"
        value={deliveryDate}
        onChange={newValue => {
          setDeliveryDate(newValue ?? "");
        }}
        renderInput={params => <TextField name="deliveryDate" {...params} />}
      />
      <Button variant="contained" type="submit">
        Create
      </Button>
    </Stack>
  );
}
