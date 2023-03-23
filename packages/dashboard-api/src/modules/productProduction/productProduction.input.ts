import { Field, InputType } from "type-graphql";
import { CostDiscountType } from "./productProduction.types";

@InputType()
export class StartProductionInput {
  @Field()
  productName!: string;
}

@InputType()
export class ProductBulkProductionCostDiscountInput {
  @Field()
  quantityThreshold!: number;

  @Field()
  discount!: number;

  @Field()
  discountType!: CostDiscountType;
}

@InputType()
export class UpdateProductionCostInput {
  @Field()
  code!: string;

  @Field()
  productionCost!: number;

  @Field(() => [ProductBulkProductionCostDiscountInput], { nullable: true })
  bulkProductionCostDiscounts?: ProductBulkProductionCostDiscountInput[];
}
