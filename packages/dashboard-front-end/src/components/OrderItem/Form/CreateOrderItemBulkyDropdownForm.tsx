import { Grid } from "@mui/material";
import { useState, FormEvent } from "react";
import { ProductFieldsFragment } from "../../../generated/graphql";
import { ProductDropDown } from "../../Product";

import { VariantAttributeSetDropDown } from "../../VariantAttribute";
import { OrderItemPrice } from "../OrderItemPrice";
import { OrderItemBulkyFormType } from "./types";

export function CreateOrderItemBulkyDropdownForm({
  onSubmit,
  onChange,
  id = "createOrderItemBulkyForm",
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (value: OrderItemBulkyFormType) => void;
  id?: string;
}) {
  const [priceDetailsPerItem, setPriceDetailsPerItem] = useState<{
    itemPrice: number;
    discountPerItem: number;
  }>({ itemPrice: 0, discountPerItem: 0 });
  const [product, setProduct] = useState<ProductFieldsFragment | null>(null);

  // const [totalQuantity, setTotalQuantity] = useState<number>(0);
  // const [totalPrice, setTotalPrice] = useState<number>(0);
  // const [discountPerItem, setDiscountPerItem] = useState<number>(0);

  // useEffect(() => {
  //   productCode != null && onChange({ productCode, pricePerItem, variantSets });
  //   setTotalQuantity(
  //     variantSets.reduce<number>((acc, { quantity }) => acc + quantity, 0)
  //   );
  // }, [pricePerItem, productCode, JSON.stringify(variantSets)]);

  // useEffect(() => {
  //   setTotalPrice(pricePerItem * totalQuantity);
  // }, [totalQuantity, pricePerItem]);

  return (
    <Grid container component="form" id={id} onSubmit={onSubmit} rowGap={1}>
      <Grid container item>
        <Grid item xs={12}>
          <ProductDropDown onChange={setProduct} />
        </Grid>
        {product != null && (
          <>
            <Grid item xs={12}>
              <OrderItemPrice
                onChange={setPriceDetailsPerItem}
                product={product}
              />
            </Grid>
            <Grid item xs={12}>
              <VariantAttributeSetDropDown
                productCode={product.code}
                onChange={variantSets =>
                  onChange({
                    productCode: product.code,
                    pricePerItem: priceDetailsPerItem.itemPrice,
                    variantSets,
                  })
                }
              />
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
}

{
  /* <Grid item container gap={1}>
<Grid item xs={12} sm={"auto"}>
  <Typography
    component="h4"
    variant="subtitle2"
  >{`Total quantity: ${totalQuantity}`}</Typography>
</Grid>
<Grid item xs={12} sm={"auto"}>
  <Typography
    component="h4"
    variant="subtitle2"
  >{`Total price: ${toCurrency(totalPrice)}`}</Typography>
</Grid>
<Grid item xs={12} sm={"auto"}>
  {discountPerItem !== 0 && (
    <Typography component="h4" variant="subtitle2">
      Discount: {`${toCurrency(discountPerItem)}/unit is applied`}
    </Typography>
  )}
</Grid>
</Grid> */
}
