import {
  Grid,
  Typography,
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { CreateAttributeInput } from "../../generated/graphql";
import { VariantAttributesDropDown } from "./VariantAttributeDropDown";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { VariantAttributeSet } from "./types";

export function VariantAttributeSetDropDown({
  productCode,
  onChange,
}: {
  productCode: string;
  onChange: (variantSet: VariantAttributeSet[]) => void;
}) {
  const [variantSets, setVariantSets] = useState<VariantAttributeSet[]>([]);

  function checkForDuplicatedVariant(
    variant: CreateAttributeInput[],
    id: number
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

    const variantId = usedVariantObjects
      .reverse()
      .findIndex(
        item => JSON.stringify(item) === JSON.stringify(variantObject)
      );

    if (variantId != id)
      toast.warn("You are about to use the same variant specified before!");
  }

  // useEffect(() => {
  //   const selectedProduct = products.find(item => item.code === productCode);
  //   if (selectedProduct != null) {
  //     const { cost: baseCost, bulkProductionCostDiscounts } =
  //       selectedProduct.production;
  //     const bulkProductionCost = [...bulkProductionCostDiscounts]
  //       .sort((a, b) => b.quantityThreshold - a.quantityThreshold)
  //       .find(({ quantityThreshold }) => totalQuantity > quantityThreshold);
  //     const costWithDiscountApplied =
  //       bulkProductionCost != null
  //         ? baseCost - bulkProductionCost.discount
  //         : baseCost;
  //     setPricePerItem(costWithDiscountApplied);
  //     setDiscountPerItem(bulkProductionCost?.discount ?? 0);
  //   }
  // }, [products, productCode, totalQuantity]);

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
    <Grid container>
      <Grid item xs={12}>
        <Typography component="h4" variant="inherit">
          {`Variant sets of product with code ${productCode}`}
          <IconButton
            size="medium"
            color="secondary"
            onClick={() => {
              const newVariantSet: VariantAttributeSet = {
                quantity: 0,
                attributes: [],
                id: variantSets.length,
              };
              const updatedVariantSets = [newVariantSet, ...variantSets];
              setVariantSets(updatedVariantSets);
              onChange(updatedVariantSets);
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
              onChange(withoutLast);
            }}
          >
            <RemoveIcon />
          </IconButton>
        </Typography>
      </Grid>

      {variantSets.map(({ id }) => (
        <Grid item container xs={12} rowSpacing={1} key={id}>
          <Grid item xs={12}>
            <VariantAttributesDropDown
              onChange={variant => {
                const variantSetToUpdateIndex = variantSets.findIndex(
                  ({ id: itemId }) => itemId === id
                );
                const variantSetsClone = [...variantSets];
                variantSetsClone[variantSetToUpdateIndex].attributes = variant;
                checkForDuplicatedVariant(variant, id);
                setVariantSets(variantSetsClone);
                onChange(variantSetsClone);
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
                const variantSetToUpdateIndex = variantSets.findIndex(
                  ({ id: itemId }) => itemId === id
                );
                const variantSetsClone = [...variantSets];
                variantSetsClone[variantSetToUpdateIndex].quantity =
                  Number(value);
                setVariantSets(variantSetsClone);
                onChange(variantSetsClone);
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ mb: 1 }} />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
