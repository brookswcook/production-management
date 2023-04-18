import { Stack, Autocomplete, Box, TextField } from "@mui/material";
import { ReactElement, useState } from "react";
import {
  CreateAttributeInput,
  useAttributeDefinitionsQuery,
} from "../../generated/graphql";

export function VariantAttributesDropDown({
  onChange,
}: {
  onChange: (variantAttributes: CreateAttributeInput[]) => void;
}): ReactElement {
  const [variantAttributes, setVariantAttributes] = useState<
    CreateAttributeInput[]
  >([]);
  const {
    data: { attributeDefinitions } = {
      attributeDefinitions: [],
    },
    loading: attributeDefinitionLoading,
  } = useAttributeDefinitionsQuery();

  // TODO: support unit
  function onValueChange(key: string, value: string) {
    const attributeIndex = variantAttributes.findIndex(item => item.key == key);
    const updatedVariantAttributes = [...variantAttributes];
    if (attributeIndex === -1) {
      const newAttributeIndex = updatedVariantAttributes.length;
      updatedVariantAttributes[newAttributeIndex] = { key, value, unit: null };
    } else {
      updatedVariantAttributes[attributeIndex] = { key, value, unit: null };
    }
    setVariantAttributes(updatedVariantAttributes);
    onChange(updatedVariantAttributes);
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
