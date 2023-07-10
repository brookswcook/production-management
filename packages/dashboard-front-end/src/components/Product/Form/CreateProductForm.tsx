import { FormEvent, ReactElement, useState } from "react";
import {
  Autocomplete,
  Box,
  Stack,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  CreateProductInput,
  useCreateProductMutation,
  useFabricsQuery,
  useFactoriesQuery,
  useStylesQuery,
} from "../../../generated/graphql";
import { toast } from "react-toastify";
import { ApolloError } from "@apollo/client";

export default function CreateProductForm({
  onSubmit,
  id = "createProduct",
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  id?: string;
}): ReactElement {
  const [newProductMutation] = useCreateProductMutation({
    refetchQueries: ["Products"],
  });
  const { data: { styles } = { styles: [] } } = useStylesQuery();
  const { data: { fabrics } = { fabrics: [] } } = useFabricsQuery();
  const { data: { factories } = { factories: [] } } = useFactoriesQuery();
  const [factoryId, setFactoryId] = useState<string | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<string>(
    new Date().toISOString()
  );

  async function createNewProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { styleCode, fabricCode } = Object.fromEntries(
      data.entries()
    ) as unknown as CreateProductInput;
    try {
      if (factoryId == null) return toast.error("Factory should be selected");
      await newProductMutation({
        variables: {
          data: { styleCode, fabricCode, factoryId, deliveryDate },
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
      onSubmit={createNewProduct}
      spacing={2}
      autoComplete="off"
      id={id}
      sx={{ mt: 1 }}
    >
      <Autocomplete
        options={styles}
        getOptionLabel={option => option.code}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {`${option.code} ${option.name}`}
          </Box>
        )}
        renderInput={params => (
          <TextField {...params} name="styleCode" label="Style" required />
        )}
      />
      <Autocomplete
        options={fabrics}
        getOptionLabel={option => option.code}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {`${option.code} ${option.title}`}
          </Box>
        )}
        renderInput={params => (
          <TextField {...params} name="fabricCode" label="Fabric" required />
        )}
      />
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
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
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
      </LocalizationProvider>
    </Stack>
  );
}
