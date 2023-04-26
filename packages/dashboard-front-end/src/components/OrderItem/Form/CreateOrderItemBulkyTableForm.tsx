import { Grid } from "@mui/material";
import { FormEvent, useState } from "react";
import { ProductFieldsFragment } from "../../../generated/graphql";
import { ProductDropDown } from "../../Product";
import { VariantAttributeSetTable } from "../../VariantAttribute";
import { OrderItemPrice } from "../OrderItemPrice";
import { OrderItemBulkyFormType } from "./types";

export function CreateOrderItemBulkyTableForm({
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
              <VariantAttributeSetTable
                onChange={variantAttributeSets =>
                  onChange({
                    productCode: product.code,
                    pricePerItem: priceDetailsPerItem.itemPrice,
                    variantAttributeSets,
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
