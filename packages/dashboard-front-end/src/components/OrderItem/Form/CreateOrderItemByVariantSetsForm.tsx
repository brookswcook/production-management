import {
  Typography,
  Autocomplete,
  Box,
  TextField,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import { useState, useEffect, FormEvent } from "react";
import {
  CreateAttributeInput,
  Product,
  ProductFieldsFragment,
  useProductsQuery,
} from "../../../generated/graphql";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { toast } from "react-toastify";
import FloatTextField from "../../Common/FloatTextField";
import { Variant } from "../../Attribute";
import { toCurrency } from "../../Common";

type VariantSet = {
  attributes: CreateAttributeInput[];
  quantity: number;
};

export type OrderItemBulkyFormType = {
  productCode: string;
  pricePerItem: number;
  variantSets: VariantSet[];
};

export function CreateOrderItemBulkyForm({
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
  const [variantSets, setVariantSets] = useState<VariantSet[]>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discountPerItem, setDiscountPerItem] = useState<number>(0);
  const { data: { products } = { products: [] } } = useProductsQuery();

  function checkForDuplicatedVariant(
    variant: CreateAttributeInput[],
    index: number
  ) {
    const usedVariantObjects: Record<string, string>[] = variantSets.map(
      ({ attributes }) =>
        attributes.reduce<{ [x: string]: string }>((acc, { key, value }) => {
          return { ...acc, ...{ [key]: value } };
        }, {})
    );
    const variantObject = variant.reduce(
      (acc, { key, value }) => ({ ...acc, ...{ [key]: value } }),
      {}
    );

    const variantIndex = usedVariantObjects.findIndex(
      item => JSON.stringify(item) === JSON.stringify(variantObject)
    );

    if (variantIndex != index)
      toast.warn("You are about to use the same variant specified before!");
  }

  useEffect(() => {
    const selectedProduct = products.find(item => item.code === productCode);
    if (selectedProduct != null) {
      const { cost: baseCost, bulkProductionCostDiscounts } =
        selectedProduct.production;
      const bulkProductionCost = [...bulkProductionCostDiscounts]
        .sort((a, b) => b.quantityThreshold - a.quantityThreshold)
        .find(({ quantityThreshold }) => totalQuantity > quantityThreshold);
      const costWithDiscountApplied =
        bulkProductionCost != null
          ? baseCost - bulkProductionCost.discount
          : baseCost;
      setPricePerItem(costWithDiscountApplied);
      setDiscountPerItem(bulkProductionCost?.discount ?? 0);
    }
  }, [products, productCode, totalQuantity]);

  useEffect(() => {
    productCode != null && onChange({ productCode, pricePerItem, variantSets });
    setTotalQuantity(
      variantSets.reduce<number>((acc, { quantity }) => acc + quantity, 0)
    );
  }, [pricePerItem, productCode, JSON.stringify(variantSets)]);

  useEffect(() => {
    setTotalPrice(pricePerItem * totalQuantity);
  }, [totalQuantity, pricePerItem]);

  return (
    <Grid container component="form" id={id} onSubmit={onSubmit}>
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
      <Grid item container gap={1}>
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
      </Grid>
      {productCode && (
        <>
          <Grid item xs={12}>
            <Typography component="h4" variant="inherit">
              Variant sets of selected product{" "}
              <IconButton
                size="medium"
                color="secondary"
                onClick={() => {
                  const newVariantSet: VariantSet = {
                    quantity: 0,
                    attributes: [{ key: "", value: "", unit: null }],
                  };
                  setVariantSets([...variantSets, newVariantSet]);
                }}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                size="medium"
                color="secondary"
                onClick={() => {
                  const withoutLast = variantSets.slice(0, -1);
                  setVariantSets(withoutLast);
                }}
              >
                <RemoveIcon />
              </IconButton>
            </Typography>
          </Grid>

          {variantSets.map((_, index) => (
            <Grid item container xs={12} rowSpacing={1} key={index}>
              <Grid item xs={12}>
                <Variant
                  onChange={variant => {
                    const updatedVariantSets = [...variantSets];
                    updatedVariantSets[index].attributes = variant;
                    checkForDuplicatedVariant(variant, index);
                    setVariantSets(updatedVariantSets);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  InputProps={{
                    inputProps: { min: 1 },
                  }}
                  onChange={({ target: { value } }) => {
                    const updatedVariantSets = [...variantSets];
                    updatedVariantSets[index].quantity = Number(value);
                    setVariantSets(updatedVariantSets);
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ mb: 1 }} />
              </Grid>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}
