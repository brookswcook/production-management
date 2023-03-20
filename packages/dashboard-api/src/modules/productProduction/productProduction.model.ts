import { prop as Property } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Production } from "../common/production";

@ObjectType()
export class ProductBulkProductionCostDiscount {
  @Field()
  @Property()
  quantityThreshold!: number;

  @Field()
  @Property()
  discount!: number;

  @Field()
  @Property()
  discountType!: CostDiscountType;
}

type CostDiscountType = "currency" | "percent";

@ObjectType()
export class ProductProduction extends Production {
  @Field()
  @Property({ required: true, default: 0 })
  cost!: number;

  @Field(() => [ProductBulkProductionCostDiscount])
  @Property({
    required: true,
    _id: false,
    type: [ProductBulkProductionCostDiscount],
  })
  bulkProductionCostDiscounts!: ProductBulkProductionCostDiscount[];

}
