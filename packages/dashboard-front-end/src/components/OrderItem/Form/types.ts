import { VariantAttributeSet } from "../../VariantAttribute";

export type OrderItemBulkyFormType = {
  productCode: string;
  pricePerItem: number;
  variantAttributeSets: VariantAttributeSet[];
};
