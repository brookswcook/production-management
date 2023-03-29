import {
  Autocomplete,
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ReactElement, useState } from "react";
import { toast } from "react-toastify";
import {
  CreateAttributeInput,
  useAttributeDefinitionsQuery,
} from "../../generated/graphql";
import { toCurrency } from "../Common";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export function Variant({
  onChange,
}: {
  onChange: (variant: CreateAttributeInput[]) => void;
}): ReactElement {
  const [variant, setVariant] = useState<CreateAttributeInput[]>([]);
  const {
    data: { attributeDefinitions } = {
      attributeDefinitions: [],
    },
    loading: attributeDefinitionLoading,
  } = useAttributeDefinitionsQuery();

  // TODO: support unit
  function onValueChange(key: string, value: string) {
    const attributeIndex = variant.findIndex(item => item.key == key);
    const updatedVariant = [...variant];
    if (attributeIndex === -1) {
      const newAttributeIndex = updatedVariant.length;
      updatedVariant[newAttributeIndex] = { key, value, unit: null };
    } else {
      updatedVariant[attributeIndex] = { key, value, unit: null };
    }
    setVariant(updatedVariant);
    onChange(updatedVariant);
  }

  if (attributeDefinitionLoading) return <></>;
  return (
    <Stack spacing={1}>
      {attributeDefinitions.map(({ name, values }, index) => (
        <Autocomplete
          key={`Autocomplete_${index}`}
          options={values ?? []}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {`${option}`}
            </Box>
          )}
          onChange={(_, value) => onValueChange(name, String(value))}
          renderInput={params => (
            <TextField {...params} label={name} type={"text"} required />
          )}
        />
      ))}
    </Stack>
  );
}

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
// const [totalQuantity, setTotalQuantity] = useState<number>(0);
// const [totalPrice, setTotalPrice] = useState<number>(0);
// const [discountPerItem, setDiscountPerItem] = useState<number>(0);

export function VariantSet({ productCode }: { productCode: string }) {
  const [variantSets, setVariantSets] = useState<VariantSet[]>([]);

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
                variantSetsClone[variantSetToUpdateIndex].attributes = variant;
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
    </Grid>
  );
}

{
  /* <Grid item xs={12}>
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
</Grid> */
}
