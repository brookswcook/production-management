import { CreateAttributeInput } from "../../generated/graphql";

export type VariantAttributeSet = {
  attributes: CreateAttributeInput[];
  quantity: number;
};
