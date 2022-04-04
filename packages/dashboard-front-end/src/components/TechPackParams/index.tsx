import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  UploadTechPackInput,
  useUploadTechPackMutation,
} from "../../generated/graphql";

export default function TechPackParams({
  productName,
}: {
  productName?: string;
}) {
  const [uploadTechPackMutation] = useUploadTechPackMutation({
    refetchQueries: ["Products"],
  });

  async function uploadTechPack(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (productName == null) return;
    try {
      const inputData = Object.fromEntries(data.entries()) as Omit<
        UploadTechPackInput,
        "productName"
      >;
      await uploadTechPackMutation({
        variables: { data: { productName, ...inputData } },
      });
    } catch (error) {
      toast.error("User input error");
    }
  }

  return (
    <Stack
      component="form"
      autoComplete="off"
      onSubmit={uploadTechPack}
      spacing={2}
    >
      <FormControl disabled>
        <FormLabel id="tech-pack-type-label">Type</FormLabel>
        <RadioGroup
          aria-labelledby="tech-pack-type-label"
          defaultValue="pantone"
          name="type"
          row={true}
        >
          <FormControlLabel
            value="pantone"
            control={<Radio />}
            label="pantone"
          />
          <FormControlLabel value="print" control={<Radio />} label="print" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="fabric-input">Fabric code</InputLabel>
        <Input name="fabricCode" id="fabric-input" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="pantone-input">Pantone</InputLabel>
        <Input name="pantone" id="pantone-input" />
      </FormControl>
      <Button variant="contained" type="submit">
        Upload
      </Button>
    </Stack>
  );
}
