import {
  Stack,
  Typography,
  Autocomplete,
  Box,
  TextField,
  Button,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import { useState, useEffect, ReactElement, FormEvent } from "react";
import {
  CreateAttributeInput,
  CreateOrderItemInput,
  useAttributeDefinitionsQuery,
  useCreateOrderItemMutation,
  useProductsQuery,
} from "../../../generated/graphql";
import { PopperButton } from "../../PopperButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { toast } from "react-toastify";
import FloatTextField from "../../Common/FloatTextField";

type ItemSet = {
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
  const [itemSets, setItemSets] = useState<ItemSet[]>([]);
  const [productCode, setProductCode] = useState<string | null>(null);
  const [predefinedProductionCost, setPredefinedProductionCost] =
    useState<number>(0);
  const { data: { products } = { products: [] } } = useProductsQuery();
  const [newOrderItem] = useCreateOrderItemMutation({
    refetchQueries: ["PurchaseOrder", "OrderItems", "ActionLogs"],
  });

  useEffect(() => {
    const selectedProduct = products.find(item => item.code === productCode);
    setPredefinedProductionCost(selectedProduct?.productionCost ?? 0);
  }, [products, productCode]);

  async function createOrderItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { price, quantity } = Object.fromEntries(
      data.entries()
    ) as unknown as CreateOrderItemInput;
    try {
      productCode &&
        (await newOrderItem({
          variables: {
            data: {
              orderUid,
              productCode,
              quantity: Number(quantity),
              price: Number(price),
              variantAttributes: [], // set attributes form item set
            },
          },
        }));
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Stack
      component="form"
      onSubmit={createOrderItem}
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
          <Box component="li" {...props}>
            {`${option.code}`}
          </Box>
        )}
        renderInput={params => (
          <TextField {...params} label="Product" required />
        )}
      />

      <FloatTextField
        label="Price per item"
        name="price"
        value={String(predefinedProductionCost)}
        onChange={({ target: { value } }) =>
          setPredefinedProductionCost(Number(value))
        }
        required
      />
      {productCode && (
        <>
          <Typography component="h4" variant="inherit">
            Item sets of selected product{" "}
            <IconButton
              size="medium"
              color="secondary"
              onClick={() => {
                const newItemSet: ItemSet = {
                  quantity: 0,
                  attributes: [{ key: "", value: "", unit: null }],
                };
                setItemSets([...itemSets, newItemSet]);
              }}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              size="medium"
              color="secondary"
              onClick={() => {
                const withoutLast = itemSets.slice(0, -1);
                setItemSets(withoutLast);
              }}
            >
              <RemoveIcon />
            </IconButton>
          </Typography>
          {itemSets.map(({ attributes, quantity }, index) => (
            <PurchaseOrderItemSet key={index} />
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

  function PurchaseOrderItemSet() {
    const {
      data: { attributeDefinitions } = {
        attributeDefinitions: [],
      },
      loading,
    } = useAttributeDefinitionsQuery();
    if (loading) return <></>;
    return (
      <>
        <Grid container justifyContent={"space-between"}>
          <Grid item xs={6}>
            {attributeDefinitions.map(({ name, values }) => (
              <Autocomplete
                options={values ?? []}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {`${option}`}
                  </Box>
                )}
                renderInput={params => (
                  <TextField {...params} label={name} type={"text"} required />
                )}
              />
            ))}
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Quantity"
              type="number"
              InputProps={{
                inputProps: { min: 1 },
              }}
              required
            />
          </Grid>
        </Grid>
        <Divider />
      </>
    );
  }
}

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
      title={"Add item"}
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
