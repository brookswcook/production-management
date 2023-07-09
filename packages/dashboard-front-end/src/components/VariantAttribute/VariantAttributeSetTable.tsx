import { Grid } from "@mui/material";
import {
  GridColDef,
  GridRowEditStopParams,
  GridValueSetterParams,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  AttributeDefinition,
  CreateAttributeInput,
  useAttributeDefinitionsQuery,
} from "../../generated/graphql";
import { VariantAttributeSet } from "./types";
import { ListView } from "../ListView";

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
  variants: { attributes: CreateAttributeInput[] }[];
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
  const predefinedAttributeDefinitions = attributeDefinitions
    .filter(
      attributeDefinition =>
        attributeDefinition.values != null &&
        attributeDefinition.values.length > 0
    )
    .map(({ __typename, ...rest }) => ({ ...rest })) as Omit<
    AttributeDefinition,
    "__typename"
  >[];

  const attributes: CreateAttributeInput[][] =
    predefinedAttributeDefinitions.map(({ name, values, ...rest }) =>
      values!.map(value => ({ key: name, value, ...rest }))
    );

  const variants = cartesian<CreateAttributeInput>(attributes).map(
    attributes => ({ attributes })
  );
  return variants;
}

type UniqueVariantAttributeSet = VariantAttributeSet & { id: string };

export default function VariantAttributeSetTable({
  onChange,
}: {
  onChange: (variantAttributeSets: UniqueVariantAttributeSet[]) => void;
}) {
  const [variantAttributeSets, setVariantAttributeSets] = useState<
    UniqueVariantAttributeSet[]
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
    const variantAttributeSets = variants.map(({ attributes }) => ({
      attributes,
      quantity: 0,
      id: stringifyAttributes(attributes),
    }));
    setVariantAttributeSets(variantAttributeSets);
  }, [attributeDefinitions]);

  const columns: GridColDef<UniqueVariantAttributeSet>[] = [
    {
      field: "attributes",
      headerName: "Variant",
      minWidth: 100,
      flex: 1,
      type: "string",
      valueGetter: ({ row }) => {
        return stringifyAttributes(row.attributes);
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 100,
      flex: 1,
      type: "number",
      valueSetter: (
        params: GridValueSetterParams<UniqueVariantAttributeSet, number>
      ) => {
        const { value } = params;
        return { ...params.row, quantity: Number(Math.abs(value).toFixed(0)) };
      },
      editable: true,
    },
  ];

  if (attributeDefinitionLoading) return <></>;

  return (
    <Grid container>
      <ListView
        name={"variant-attribute-set-table"}
        autoHeight
        editMode="row"
        rows={variantAttributeSets}
        columns={columns}
        slots={{
          footer: () => {
            return <></>;
          },
        }}
        onRowEditStop={(
          params: GridRowEditStopParams<UniqueVariantAttributeSet>
        ) => {
          const changedVariantAttributeSetIndex =
            variantAttributeSets.findIndex(({ id }) => id === params.row.id);
          const updatedVariantAttributeSets = [...variantAttributeSets];
          updatedVariantAttributeSets[changedVariantAttributeSetIndex] =
            params.row;
          setVariantAttributeSets(updatedVariantAttributeSets);
          const specifiedVariantAttributeSets =
            updatedVariantAttributeSets.filter(item => item.quantity > 0);
          onChange(specifiedVariantAttributeSets);
        }}
        disableGutters
      />
    </Grid>
  );
}
