import { Stack, Typography, Autocomplete, Box, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import {
  CreateAttributeInput,
  useAttributeDefinitionsQuery,
} from "../../../generated/graphql";

export default function AddOrderItemAttributeForm({
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
