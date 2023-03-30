import { Autocomplete, Box, TextField, Grid } from "@mui/material";
import { useState, FormEvent } from "react";
import { useProductsQuery } from "../../../generated/graphql";

import FloatTextField from "../../Common/FloatTextField";
import { OrderItemBulkyFormType } from "../../Attribute";

export function CreateOrderItemBulkyDropdownForm({
  onSubmit,
  onChange,
  id = "createOrderItemBulkyForm",
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (value: OrderItemBulkyFormType) => void;
  id?: string;
}) {
  const [pricePerItem, setPricePerItem] = useState<number>(0);
  const [productCode, setProductCode] = useState<string | null>(null);
  const { data: { products } = { products: [] } } = useProductsQuery();

  return (
    <Grid container component="form" id={id} onSubmit={onSubmit} rowGap={1}>
      <Grid container item>
        <Grid item xs={12}>
          <Autocomplete
            options={products}
            getOptionLabel={option => option.code}
            onChange={(_, value) =>
              value != null && setProductCode(value?.code)
            }
            renderOption={(props, option) => (
              <Box component="li" key={option.code} {...props}>
                {`${option.code}`}
              </Box>
            )}
            renderInput={params => {
              params.fullWidth = true;
              return (
                <TextField
                  {...params}
                  label="Product"
                  required
                  sx={{ mt: 1 }}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FloatTextField
            fullWidth
            label="Price per item"
            value={String(pricePerItem)}
            onChange={({ target: { value } }) => setPricePerItem(Number(value))}
            required
            sx={{ mt: 1 }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
