import { Autocomplete, Box, TextField } from "@mui/material";
import { useProductsQuery } from "../../generated/graphql";

export function ProductCodeDropDown({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const { data: { products } = { products: [] } } = useProductsQuery();

  return (
    <Autocomplete
      options={products}
      getOptionLabel={option => option.code}
      onChange={(_, value) => value != null && onChange(String(value))}
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
