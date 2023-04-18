import { VariantAttributeSet } from "../../VariantAttribute";

export type OrderItemBulkyFormType = {
  productCode: string;
  pricePerItem: number;
  variantSets: VariantAttributeSet[];
};
