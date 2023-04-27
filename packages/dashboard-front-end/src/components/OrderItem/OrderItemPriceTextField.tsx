import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ProductFieldsFragment } from "../../generated/graphql";
import { toCurrency } from "../Common";
import FloatTextField from "../Common/FloatTextField";

export function OrderItemPriceTextField({
  onChange,
  product,
  quantity = 0,
  initialValue = 0,
}: {
  onChange: ({
    itemPrice,
    discountPerItem,
  }: {
    itemPrice: number;
    discountPerItem: number;
  }) => void;
  product: ProductFieldsFragment;
  quantity?: number;
  initialValue?: number;
}) {
  const [itemPrice, setItemPrice] = useState<number>(initialValue);
  const [discountPerItem, setDiscountPerItem] = useState<number>(0);

  useEffect(() => {
    if (product != null) {
      const { cost: baseCost, bulkProductionCostDiscounts } =
        product.production;
      const bulkProductionCost = [...bulkProductionCostDiscounts]
        .sort((a, b) => b.quantityThreshold - a.quantityThreshold)
        .find(({ quantityThreshold }) => quantity > quantityThreshold);
      const costWithDiscountApplied =
        bulkProductionCost != null
          ? baseCost - bulkProductionCost.discount
          : baseCost;
      setItemPrice(costWithDiscountApplied);
      setDiscountPerItem(bulkProductionCost?.discount ?? 0);
    }
  }, [product, quantity]);

  useEffect(() => {
    onChange({ itemPrice, discountPerItem });
  }, [itemPrice, discountPerItem]);

  return (
    <Grid item container gap={1}>
      <Grid item xs={12}>
        <FloatTextField
          fullWidth
          label="Price per item"
          value={itemPrice}
          onChange={({ target: { value } }) => setItemPrice(Number(value))}
          required
          sx={{ mt: 1 }}
        />
      </Grid>
      <Grid item xs={12} sm={"auto"}>
        <Typography
          component="h4"
          variant="subtitle2"
        >{`Total quantity: ${quantity}`}</Typography>
      </Grid>
      <Grid item xs={12} sm={"auto"}>
        <Typography
          component="h4"
          variant="subtitle2"
        >{`Total price: ${toCurrency(itemPrice * quantity)}`}</Typography>
      </Grid>
      <Grid item xs={12} sm={"auto"}>
        {discountPerItem !== 0 && (
          <Typography component="h4" variant="subtitle2">
            Discount: {`${toCurrency(discountPerItem)}/unit is applied`}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
