import { Grid } from "@mui/material";
import { FormEvent, useState } from "react";
import { ProductFieldsFragment } from "../../../generated/graphql";
import ProductDropDown from "../../Product/ProductDropDown";
import VariantAttributeSetTable from "../../VariantAttribute/VariantAttributeSetTable";
import OrderItemPriceTextField from "../OrderItemPriceTextField";
import { OrderItemBulkyFormType } from "./types";

export default function CreateOrderItemBulkyTableForm({
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
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  return (
    <Grid container component="form" id={id} onSubmit={onSubmit} rowGap={1}>
      <Grid item xs={12}>
        <ProductDropDown onChange={setProduct} />
      </Grid>
      {product != null && (
        <>
          <Grid item xs={12}>
            <OrderItemPriceTextField
              onChange={setPriceDetailsPerItem}
              product={product}
              quantity={totalQuantity}
            />
          </Grid>
          <Grid item xs={12}>
            <VariantAttributeSetTable
              onChange={variantAttributeSets => {
                onChange({
                  productCode: product.code,
                  pricePerItem: priceDetailsPerItem.itemPrice,
                  variantAttributeSets,
                });
                setTotalQuantity(
                  variantAttributeSets.reduce<number>(
                    (acc, { quantity }) => acc + quantity,
                    0
                  )
                );
              }}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}
