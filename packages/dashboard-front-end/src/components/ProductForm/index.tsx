import { FormEvent, useState } from "react";
import {
  Button,
  MenuItem,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
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
import FilePreload from "../FilePreload";

export function CreateProductForm() {
  const [newProductMutation] = useCreateProductMutation({
    refetchQueries: ["Products"],
  });
  const [newStyleMutation] = useCreateStyleMutation();
  const [newFabricMutation] = useCreateFabricMutation();

  const [getStyle] = useStyleLazyQuery();
  const [getFabric] = useFabricLazyQuery();
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [techPackFiles, setTechPackFiles] = useState<File[]>(null!);
  const [printFiles, setPrintFiles] = useState<File[] | null>(null);

  async function createNewProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const {
      name: styleName,
      styleCode,
      fabricCode,
      colorName,
      colorCode,
      factoryName,
    } = Object.fromEntries(data.entries()) as unknown as CreateProductInput &
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
          `Style with ${styleCode} code exists. 
          Created product will use it. 
          Uploaded tech pack will be ignored`,
          { delay: 30 }
        );
      } else {
        const newStyleData: CreateStyleInput = {
          code: styleCode,
          name: styleName,
        };
        if (techPackFiles) {
          newStyleData.techPack = techPackFiles.map(file => ({
            file,
            fileSize: file.size,
          }));
        }
        await newStyleMutation({
          variables: { data: newStyleData },
        });
      }

      if (fabricData?.fabric) {
        toast.info(
          `Fabric with ${fabricCode} code exists. 
          Created product will use it. 
          Uploaded fabric print will be ignored`,
          { delay: 30 }
        );
      } else {
        const newFabricData: CreateFabricInput = {
          code: fabricCode,
          colorName,
          colorCode,
        };
        if (printFiles) {
          newFabricData.print = printFiles.map(file => ({
            file,
            fileSize: file.size,
          }))[0];
        }
        await newFabricMutation({
          variables: { data: newFabricData },
        });
      }

      await newProductMutation({
        variables: {
          data: { styleCode, fabricCode, factoryName, deliveryDate },
        },
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
      <Typography component="h4" variant="inherit">
        {`Create new product`}
      </Typography>
      <TextField
        label="Style Number"
        name="styleCode"
        helperText="Example: VD-193"
        required
      />
      <TextField
        label="Style Name"
        name="name"
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
        helperText="Example: color swatch 1345. If fabric has print leave it empty."
      />
      <TextField
        select
        label="Factory"
        name="factoryName"
        SelectProps={{
          MenuProps: { disablePortal: true },
        }}
      >
        <MenuItem value={"Amy"}>Amy</MenuItem>
        <MenuItem value={"Kevin"}>Kevin</MenuItem>
      </TextField>
      <FilePreload
        label="Print"
        setFiles={setPrintFiles}
        helperText={"Upload print file if fabric has print"}
      />
      <FilePreload
        label="Tech Pack"
        setFiles={setTechPackFiles}
        helperText={"You can upload tech pack now or later"}
      />
      <DatePicker
        label="Delivery Date"
        value={deliveryDate}
        onChange={(newValue: string | null) => {
          setDeliveryDate(newValue ?? "");
        }}
        renderInput={(params: TextFieldProps) => (
          <TextField name="deliveryDate" {...params} required />
        )}
      />
      <Button variant="contained" type="submit">
        Create
      </Button>
    </Stack>
  );
}
