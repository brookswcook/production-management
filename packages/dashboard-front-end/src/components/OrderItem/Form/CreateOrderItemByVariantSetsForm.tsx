import {
  Typography,
  Autocomplete,
  Box,
  TextField,
  IconButton,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState, useEffect, FormEvent } from "react";
import {
  CreateAttributeInput,
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
  id: number;
};

export type OrderItemBulkyFormType = {
  productCode: string;
  pricePerItem: number;
  variantSets: VariantSet[];
};

//TODO: move to another file for attributes
function stringifyAttributes(
  attributes: { key: string; value: string }[]
): string | null {
  return attributes.length > 0
    ? attributes.map(({ key, value }) => `${key}: ${value}`).join("; ")
    : null;
}

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
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {variantSets.map(({ attributes, id }) => {
                  const stringifiedAttributes = stringifyAttributes(attributes);
                  return (
                    <TableCell align="right" key={id}>
                      {stringifiedAttributes}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {variantSets.map(row => (
                  <TableCell align="right" key={row.id}>
                    {row.quantity}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
                    attributes: [],
                    id: variantSets.length,
                  };
                  setVariantSets([newVariantSet, ...variantSets]);
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

          {variantSets.map(({ id }) => (
            <Grid item container xs={12} rowSpacing={1} key={id}>
              <Grid item xs={12}>
                <Variant
                  onChange={variant => {
                    const variantSetToUpdateIndex = variantSets.findIndex(
                      ({ id: itemId }) => itemId === id
                    );
                    const variantSetsClone = [...variantSets];
                    variantSetsClone[variantSetToUpdateIndex].attributes =
                      variant;
                    checkForDuplicatedVariant(variant, id);
                    setVariantSets(variantSetsClone);
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
