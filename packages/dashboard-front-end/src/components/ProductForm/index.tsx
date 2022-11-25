import { FormEvent, useState } from "react";
import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import {
  CreateProductInput,
  useCreateProductMutation,
  useFabricsQuery,
  useStylesQuery,
} from "../../generated/graphql";
import { toast } from "react-toastify";
import { ApolloError } from "@apollo/client";

export function CreateProductForm() {
  const [newProductMutation] = useCreateProductMutation({
    refetchQueries: ["Products"],
  });
  const { data: { styles } = { styles: [] } } = useStylesQuery();
  const { data: { fabrics } = { fabrics: [] } } = useFabricsQuery();
  const [deliveryDate, setDeliveryDate] = useState<string>(
    new Date().toISOString()
  );

  async function createNewProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { styleCode, fabricCode, factoryName } = Object.fromEntries(
      data.entries()
    ) as unknown as CreateProductInput;
    try {
      await newProductMutation({
        variables: {
          data: { styleCode, fabricCode, factoryName, deliveryDate },
        },
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
      <Typography component="h4" variant="inherit">
        {`Create new product`}
      </Typography>
      <Autocomplete
        disablePortal
        options={styles}
        sx={{ width: 300 }}
        getOptionLabel={option => option.code}
        renderInput={params => (
          <TextField {...params} name="styleCode" label="Style" required />
        )}
      />
      <Autocomplete
        disablePortal
        options={fabrics}
        sx={{ width: 300 }}
        getOptionLabel={option => option.code}
        renderInput={params => (
          <TextField {...params} name="fabricCode" label="Fabric" required />
        )}
      />
      <Autocomplete
        disablePortal
        options={["Amy", "Kevin"]}
        sx={{ width: 300 }}
        renderInput={params => (
          <TextField {...params} name="factoryName" label="Factory" required />
        )}
      />
      <DatePicker
        label="Production due"
        value={deliveryDate}
        onChange={newValue => {
          setDeliveryDate(newValue as string);
        }}
        renderInput={(params: TextFieldProps) => (
          <TextField name="Production due" {...params} required />
        )}
      />
      <Button variant="contained" type="submit">
        Create
      </Button>
    </Stack>
  );
}
