import { Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  AttributeDefinition,
  CreateAttributeInput,
  useAttributeDefinitionsQuery,
} from "../../generated/graphql";

export function stringifyAttributes(
  attributes: { key: string; value: string }[]
): string {
  return attributes.length > 0
    ? attributes.map(({ key, value }) => `${key}: ${value}`).join("; ")
    : "No Attributes";
}

export function stringifyVariantAttributes({
  variants,
}: {
  variants: { attributes: { key: string; value: string }[] }[];
}): string[] {
  return variants.reduce<string[]>((acc, { attributes }) => {
    const attributesIdentifier = stringifyAttributes(attributes);
    return [...acc, attributesIdentifier];
  }, []);
}

function cartesian<T>(args: T[][]) {
  const result: T[][] = [];
  const max = args.length - 1;
  function helper(arr: T[], i: number) {
    for (let j = 0, l = args[i].length; j < l; j++) {
      const a = [...arr];
      a.push(args[i][j]);
      if (i == max) result.push(a);
      else helper(a, i + 1);
    }
  }
  helper([], 0);
  return result;
}

export function createVariantsByAttributeDefinitions(
  attributeDefinitions: AttributeDefinition[]
) {
  const predefinedAttributeDefinitions = attributeDefinitions.filter(
    attributeDefinition =>
      attributeDefinition.values != null &&
      attributeDefinition.values.length > 0
  ) as { name: string; values: string[] }[];

  const attributes: Omit<CreateAttributeInput, "unit">[][] =
    predefinedAttributeDefinitions.map(({ name, values }) =>
      values.map(value => ({ key: name, value }))
    );

  const variants = cartesian<Omit<CreateAttributeInput, "unit">>(
    attributes
  ).map(attributes => ({ attributes }));
  return variants;
}

export function VariantAttributeSetTable({
  productCode,
}: {
  productCode?: string;
}) {
  const [variantSetsTableRows, setVariantSetsTableRows] = useState<
    { attributes: string; quantity: number }[]
  >([]);
  const {
    data: { attributeDefinitions } = {
      attributeDefinitions: [],
    },
    loading: attributeDefinitionLoading,
  } = useAttributeDefinitionsQuery();

  useEffect(() => {
    if (attributeDefinitions.length === 0) return;
    const variants = createVariantsByAttributeDefinitions(attributeDefinitions);
    const stringifiedVariants = stringifyVariantAttributes({ variants });
    const stringifiedVariantSetsRows = stringifiedVariants.map(attributes => ({
      attributes,
      quantity: 0,
      id: attributes,
    }));
    setVariantSetsTableRows(stringifiedVariantSetsRows);
  }, [attributeDefinitions]);

  const columns: GridColDef[] = [
    {
      field: "attributes",
      headerName: "Variant",
      minWidth: 100,
      flex: 2,
      type: "string",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 50,
      flex: 1,
      type: "number",
      editable: true,
    },
  ];

  if (attributeDefinitionLoading) return <></>;

  return (
    <Grid container>
      <DataGrid
        autoHeight
        editMode="row"
        rows={variantSetsTableRows}
        columns={columns}
      />
    </Grid>
  );
}
