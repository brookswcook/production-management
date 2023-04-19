import { useEffect, useState } from "react";
import { ProductFieldsFragment } from "../../generated/graphql";
import FloatTextField from "../Common/FloatTextField";

export function OrderItemPrice({
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
    <FloatTextField
      fullWidth
      label="Price per item"
      value={itemPrice}
      onChange={({ target: { value } }) => setItemPrice(Number(value))}
      required
      sx={{ mt: 1 }}
    />
  );
}
