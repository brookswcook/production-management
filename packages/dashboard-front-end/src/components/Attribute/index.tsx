import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import { ReactElement, useState } from "react";
import {
  CreateAttributeInput,
  useAttributeDefinitionsQuery,
} from "../../generated/graphql";

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
            <Box component="li" key={`${name}_${index}`} {...props}>
              {`${option}`}
            </Box>
          )}
          onChange={(_, value) => onValueChange(name, String(value))}
          renderInput={params => (
            <TextField
              {...params}
              label={name}
              type={"text"}
              key={`${name}_${index}`}
              required
            />
          )}
        />
      ))}
    </Stack>
  );
}
