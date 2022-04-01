import { useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import { useCreateProductMutation } from "../../generated/graphql";
import { toast } from "react-toastify";

export default function NewProduct() {
  const [newProductMutation] = useCreateProductMutation({
    refetchQueries: ["Products"],
  });

  const [model, setModel] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [sku, setSku] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);

  async function createNewProduct() {
    try {
      await newProductMutation({
        variables: { data: { model, style, sku, deliveryDate } },
      });
    } catch (error) {
      toast.error("User input error");
    }
  }

  return (
    <Stack spacing={2}>
      <FormControl>
        <InputLabel htmlFor="model-input">Model</InputLabel>
        <Input
          id="model-input"
          value={model}
          onChange={({ target: { value } }) => {
            setModel(value);
          }}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="style-input">Style</InputLabel>
        <Input
          id="style-input"
          value={style}
          onChange={({ target: { value } }) => {
            setStyle(value);
          }}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="sku-input">SKU</InputLabel>
        <Input
          id="sku-input"
          value={sku}
          onChange={({ target: { value } }) => {
            setSku(value);
          }}
        />
      </FormControl>
      <DatePicker
        label="Delivery Date"
        value={deliveryDate}
        onChange={newValue => {
          setDeliveryDate(newValue);
        }}
        renderInput={params => <TextField {...params} />}
      />
      <Button variant="contained" onClick={createNewProduct}>
        Create
      </Button>
    </Stack>
  );
}
