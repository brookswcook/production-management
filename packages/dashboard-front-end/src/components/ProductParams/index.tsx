import { FormEvent, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";
import {
  CreateFabricInput,
  CreateProductInput,
  CreateStyleInput,
  useCreateProductMutation,
  useFabricLazyQuery,
  useStyleLazyQuery,
  useCreateStyleMutation,
  useCreateFabricMutation,
} from "../../generated/graphql";
import { toast } from "react-toastify";
import { ApolloError } from "@apollo/client";

export default function ProductParams() {
  const [newProductMutation] = useCreateProductMutation({
    refetchQueries: ["Products"],
  });
  const [newStyleMutation] = useCreateStyleMutation();
  const [newFabricMutation] = useCreateFabricMutation();

  const [
    getStyle,
    // { data: styleData, error: styleError, loading: styleLoading },
  ] = useStyleLazyQuery();
  const [
    getFabric,
    // { data: fabricData, error: fabricError, loading: fabricLoading },
  ] = useFabricLazyQuery();
  const [deliveryDate, setDeliveryDate] = useState<string>("");

  async function createNewProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const {
      name: styleName,
      styleCode,
      fabricCode,
      colorName,
      colorCode,
    } = Object.fromEntries(data.entries()) as CreateProductInput &
      CreateFabricInput &
      CreateStyleInput;
    try {
      const { data: styleData } = await getStyle({
        variables: { code: styleCode },
      });
      const { data: fabricData } = await getFabric({
        variables: { code: fabricCode },
      });

      if (styleData?.style) {
        toast.info(
          `Style with ${styleCode} code exists. Created product will use it.`
        );
      } else {
        await newStyleMutation({
          variables: { data: { code: styleCode, name: styleName } },
        });
      }

      if (fabricData?.fabric) {
        toast.info(
          `Fabric with ${fabricCode} code exists. Created product will use it.`
        );
      } else {
        await newFabricMutation({
          variables: { data: { code: fabricCode, colorName, colorCode } },
        });
      }

      await newProductMutation({
        variables: { data: { styleCode, fabricCode, deliveryDate } },
      });
    } catch (error) {
      toast.error((error as ApolloError).message);
    }
  }

  return (
    <Stack
      component="form"
      onSubmit={createNewProduct}
      spacing={2}
      autoComplete="off"
    >
      <TextField
        label="Style Number"
        name="styleCode"
        helperText="Example: VD-193"
        required
      />
      <TextField
        label="Style Name"
        name="styleName"
        helperText="Example: The Mia Dress"
        required
      />
      <TextField
        label="Fabric Code"
        name="fabricCode"
        helperText="Example: K865"
        required
      />
      <TextField
        label="Color Name"
        name="colorName"
        helperText="Example: Cinnamon Stick"
        required
      />
      <TextField
        label="Color Code"
        name="colorCode"
        helperText="Example: color swatch 1345. If fabric has pattern leave it empty."
      />
      <DatePicker
        label="Delivery Date"
        value={deliveryDate}
        onChange={newValue => {
          setDeliveryDate(newValue ?? "");
        }}
        renderInput={params => (
          <TextField name="deliveryDate" {...params} required />
        )}
      />
      <Button variant="contained" type="submit">
        Create
      </Button>
    </Stack>
  );
}
