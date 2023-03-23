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
import RemoveIcon from "@mui/icons-material/Remove";
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
  const [attributeNamesToOmit, setAttributeNamesToOmit] = useState<string[]>(
    []
  );
  const [productCode, setProductCode] = useState<string | null>(null);
  const [predefinedProductionCost, setPredefinedProductionCost] =
    useState<number>(0);
  const { data: { products } = { products: [] } } = useProductsQuery();
  const [newOrderItem] = useCreateOrderItemMutation({
    refetchQueries: ["PurchaseOrder", "OrderItems", "ActionLogs"],
  });

  useEffect(() => {
    const selectedProduct = products.find(item => item.code === productCode);
    setPredefinedProductionCost(selectedProduct?.production.cost ?? 0);
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
              variantAttributes: attributes,
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
        label="Price per unit"
        name="price"
        value={String(predefinedProductionCost)}
        onChange={({ target: { value } }) =>
          setPredefinedProductionCost(Number(value))
        }
        required
      />
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
        <IconButton
          size="medium"
          color="secondary"
          onClick={() => {
            const withoutLast = attributes.slice(0, -1);
            setAttributes(withoutLast);
            setAttributeNamesToOmit(withoutLast.map(({ key }) => key));
          }}
        >
          <RemoveIcon />
        </IconButton>
      </Typography>
      {attributes.map((_, index, attributes) => (
        <AddOrderItemAttributeForm
          key={index}
          attribute={attributes[index]}
          title={`Attribute ${index + 1}`}
          onChange={() =>
            setAttributeNamesToOmit(attributes.map(({ key }) => key))
          }
          attributeNamesToOmit={attributeNamesToOmit}
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
  onChange = () => {},
  attributeNamesToOmit = [],
}: {
  attribute: CreateAttributeInput;
  title?: string;
  onChange?: () => void;
  attributeNamesToOmit?: string[];
}) {
  const [selectedAttributeDefinitionName, setSelectedAttributeDefinitionName] =
    useState<string | null>(null);
  const [attributeOptions, setAttributeOptions] = useState<string[] | null>(
    null
  );
  const {
    data: { attributeDefinitions: allAttributeDefinitions } = {
      attributeDefinitions: [],
    },
  } = useAttributeDefinitionsQuery();

  useEffect(() => {
    const selectedAttributeDefinition = allAttributeDefinitions.find(
      item => item.name === selectedAttributeDefinitionName
    );
    selectedAttributeDefinition &&
      setAttributeOptions(selectedAttributeDefinition.values);
  }, [selectedAttributeDefinitionName, allAttributeDefinitions]);

  return (
    <Stack component="div" spacing={2}>
      <Typography component="span" variant="subtitle2">
        {title}
      </Typography>
      <Autocomplete
        onChange={(_, value) => {
          setSelectedAttributeDefinitionName(String(value));
          attribute.key = String(value);
          onChange();
        }}
        options={allAttributeDefinitions
          .flatMap(item => item.name)
          .filter(name => !~attributeNamesToOmit.indexOf(name))}
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
      ) : selectedAttributeDefinitionName != null ? (
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
