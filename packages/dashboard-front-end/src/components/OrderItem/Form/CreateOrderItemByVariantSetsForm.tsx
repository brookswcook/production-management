import {
  Stack,
  Typography,
  Autocomplete,
  Box,
  TextField,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { useState, useEffect, ReactElement, FormEvent, Fragment } from "react";
import {
  CreateAttributeInput,
  useCreateOrderItemMutation,
  useProductsQuery,
} from "../../../generated/graphql";
import { PopperButton } from "../../PopperButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { toast } from "react-toastify";
import FloatTextField from "../../Common/FloatTextField";
import { Variant } from "../../Attribute";

type VariantSet = {
  attributes: CreateAttributeInput[];
  quantity: number;
};

export function CreateOrderItemBulkyForm({
  orderUid,
  title,
  footerEl,
}: {
  orderUid: number;
  title: string;
  footerEl?: ReactElement;
}) {
  const [variantSets, setVariantSets] = useState<VariantSet[]>([]);
  const [productCode, setProductCode] = useState<string | null>(null);
  const [pricePerItem, setPricePerItem] = useState<number>(0);
  const { data: { products } = { products: [] } } = useProductsQuery();
  const [newOrderItem] = useCreateOrderItemMutation({
    refetchQueries: ["PurchaseOrder", "OrderItems", "ActionLogs"],
  });

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
    setPricePerItem(selectedProduct?.productionCost ?? 0);
  }, [products, productCode]);

  async function createOrderItemsByVariantSets(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    try {
      if (productCode != null)
        for await (const { attributes, quantity } of variantSets) {
          await newOrderItem({
            variables: {
              data: {
                orderUid,
                productCode,
                quantity: Number(quantity),
                price: Number(pricePerItem),
                variantAttributes: attributes,
              },
            },
          });
        }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Stack
      component="form"
      onSubmit={createOrderItemsByVariantSets}
      spacing={2}
      autoComplete="off"
    >
      <Typography component="h4" variant="inherit">
        {title}
      </Typography>
      <Autocomplete
        options={products}
        getOptionLabel={option => option.code}
        onChange={(_, value) => value != null && setProductCode(value?.code)}
        renderOption={(props, option) => (
          <Box component="li" key={option.code} {...props}>
            {`${option.code}`}
          </Box>
        )}
        renderInput={params => (
          <TextField {...params} label="Product" required />
        )}
      />

      <FloatTextField
        label="Price per item"
        value={String(pricePerItem)}
        onChange={({ target: { value } }) => setPricePerItem(Number(value))}
        required
      />
      {productCode && (
        <>
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

          {variantSets.map((_, index) => (
            <Fragment key={index}>
              <Variant
                onChange={variant => {
                  const updatedVariantSets = [...variantSets];
                  updatedVariantSets[index].attributes = variant;
                  checkForDuplicatedVariant(variant, index);
                  setVariantSets(updatedVariantSets);
                }}
              />
              <TextField
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
              <Divider />
            </Fragment>
          ))}
        </>
      )}
      <>
        <Button variant="contained" type="submit">
          Create
        </Button>
        {footerEl}
      </>
    </Stack>
  );
}

// TODO: disallow to specify more than 1 same combination of attributes

export function CreateOrderItemBulkyPopperButton({
  orderUid,
  disabled = false,
}: {
  orderUid: number;
  disabled?: boolean;
}): ReactElement {
  const [closeSwitch, setCloseSwitch] = useState(0);
  function closePopper() {
    setCloseSwitch(closeSwitch + 1);
  }

  return (
    <PopperButton
      icon={<AddIcon />}
      title={"Add items"}
      disabled={disabled}
      closeSwitch={closeSwitch}
    >
      <CreateOrderItemBulkyForm
        orderUid={orderUid}
        title="Select product"
        footerEl={
          <Button variant="contained" onClick={closePopper}>
            Cancel
          </Button>
        }
      />
    </PopperButton>
  );
}
