import { Autocomplete, Box, TextField } from "@mui/material";
import {
  ProductFieldsFragment,
  useProductsQuery,
} from "../../generated/graphql";

export function ProductDropDown({
  onChange,
}: {
  onChange: (value: ProductFieldsFragment) => void;
}) {
  const { data: { products } = { products: [] } } = useProductsQuery();

  return (
    <Autocomplete
      options={products}
      getOptionLabel={option => option.code}
      onChange={(_, value) => value != null && onChange(value)}
      renderOption={(props, option) => (
        <Box component="li" key={option.code} {...props}>
          {`${option.code}`}
        </Box>
      )}
      renderInput={params => {
        params.fullWidth = true;
        return (
          <TextField {...params} label="Product" required sx={{ mt: 1 }} />
        );
      }}
    />
  );
}
