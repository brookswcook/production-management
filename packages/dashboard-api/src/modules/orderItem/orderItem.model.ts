import {
  getModelForClass,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { ProductSizes } from "dashboard-core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
class OrderItemAttribute {
  // TODO: move size type to core types
  @Field({ nullable: true })
  @Property({ enum: ["00", "0", "2", "4", "6", "8", "10", "12", "14", "16"] })
  size?: ProductSizes;
  // Note: extend by adding other attributes if needed; by having array of objects with optional attribute fields it's possible to create any combination of them
}

@ModelOptions({
  schemaOptions: { collection: "order_items" },
})
@ObjectType()
export class OrderItem {
  @Field()
  id!: string;

  @Field()
  @Property({ required: true })
  orderUid!: number;

  @Field()
  @Property({ required: true })
  productCode!: string;

  @Property({ required: true })
  companyId!: string;

  @Field()
  @Property({ required: true, default: 1 })
  quantity!: number;

  @Field(() => [OrderItemAttribute])
  @Property({
    type: () => [OrderItemAttribute],
    required: true,
    default: [],
    _id: false,
  })
  variantAttributes!: OrderItemAttribute[];

  @Field()
  @Property({ required: true })
  price!: number;
}

export const OrderItemModel = getModelForClass(OrderItem);
