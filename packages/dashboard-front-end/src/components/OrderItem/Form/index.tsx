import {
  Stack,
  Typography,
  Autocomplete,
  Box,
  TextField,
  Button,
  IconButton,
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
import { toast } from "react-toastify";
import FloatTextField from "../../Common/FloatTextField";

export function CreateOrderItemForm({
  orderUid,
  title,
  footerEl,
}: {
  orderUid: number;
  title: string;
  footerEl?: ReactElement;
}) {
  const [attributes, setAttributes] = useState<CreateAttributeInput[]>([]);
  const { data: { products } = { products: [] } } = useProductsQuery();
  const [newOrderItem] = useCreateOrderItemMutation({
    refetchQueries: ["OrderItems"],
  });

  async function createOrderItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { price, productCode, quantity } = Object.fromEntries(
      data.entries()
    ) as unknown as CreateOrderItemInput;
    try {
      await newOrderItem({
        variables: {
          data: {
            orderUid,
            productCode,
            quantity: Number(quantity),
            price: Number(price),
            variantAttributes: attributes,
          },
        },
      });
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
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {`${option.code}`}
          </Box>
        )}
        renderInput={params => (
          <TextField {...params} name="productCode" label="Product" required />
        )}
      />
      <FloatTextField label="Price per unit" name="price" required />
      <TextField
        label="Quantity"
        name="quantity"
        type="number"
        InputProps={{
          inputProps: { min: 1 },
        }}
        required
      />
      <Typography component="h4" variant="inherit">
        Item Attributes{" "}
        <IconButton
          size="medium"
          color="secondary"
          onClick={() =>
            setAttributes([...attributes, { key: "", value: "", unit: null }])
          }
        >
          <AddIcon />
        </IconButton>
      </Typography>
      {attributes.map((_, index, attributes) => (
        <AddOrderItemAttributeForm
          key={String(index)}
          attribute={attributes[index]}
          title={`Attribute ${index + 1}`}
        />
      ))}
      <>
        <Button variant="contained" type="submit">
          Create
        </Button>
        {footerEl}
      </>
    </Stack>
  );
}

function AddOrderItemAttributeForm({
  attribute,
  title,
}: {
  attribute: CreateAttributeInput;
  title?: string;
}) {
  const [attributeDefinitionName, setAttributeDefinitionName] = useState<
    string | null
  >(null);
  const [attributeOptions, setAttributeOptions] = useState<string[] | null>(
    null
  );
  const { data: { attributeDefinitions } = { attributeDefinitions: [] } } =
    useAttributeDefinitionsQuery();

  useEffect(() => {
    const attributeDefinition = attributeDefinitions.find(
      item => item.name === attributeDefinitionName
    );
    attributeDefinition && setAttributeOptions(attributeDefinition.values);
  }, [attributeDefinitionName, attributeDefinitions]);

  return (
    <Stack component="div" spacing={2}>
      <Typography component="span" variant="subtitle2">
        {title}
      </Typography>
      <Autocomplete
        onChange={(_, value) => {
          setAttributeDefinitionName(String(value));
          attribute.key = String(value);
        }}
        options={attributeDefinitions.flatMap(item => item.name)}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {`${option}`}
          </Box>
        )}
        renderInput={params => <TextField {...params} required />}
      />
      {attributeOptions != null ? (
        <Autocomplete
          onChange={(_, value) => {
            attribute.value = String(value);
          }}
          options={attributeOptions}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {`${option}`}
            </Box>
          )}
          renderInput={params => <TextField {...params} required />}
        />
      ) : attributeDefinitionName != null ? (
        <TextField required />
      ) : (
        <></>
      )}
    </Stack>
  );
}

export function CreateOrderItemPopperButton({
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
      <CreateOrderItemForm
        orderUid={orderUid}
        title="Add items to the order"
        footerEl={
          <Button variant="contained" onClick={closePopper}>
            Cancel
          </Button>
        }
      />
    </PopperButton>
  );
}
