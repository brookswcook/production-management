import {
  getModelForClass,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
class OrderItemAttribute {
  // TODO: move size type to core types
  @Field({ nullable: true })
  @Property()
  size?: "0-0" | "0" | "2" | "4" | "6" | "8" | "10" | "12" | "14";
  // Note: extend by adding other attributes if needed; by having array of objects with optional attribute fields it's possible to create any combination of them
}

@ModelOptions({
  schemaOptions: { collection: "order_items" },
})
@ObjectType()
export class OrderItem {
  @Field()
  @Property({ required: true })
  orderCode!: string;

  @Field()
  @Property({ required: true })
  productCode!: string;

  @Field()
  @Property({ required: true })
  companyCode!: string;

  @Field()
  @Property({ required: true, default: 1 })
  quantity!: number;

  @Field(() => [OrderItemAttribute])
  @Property({ type: () => [OrderItemAttribute], required: true, default: [] })
  variant!: OrderItemAttribute[];

  // TODO: decide where to keep the price, maybe it should be a part of a product; or a separate entity with reference to a product
  // Note: it looks like it's production price i.e should be set/calculated by factory
  // TODO: rename to productionPrice
  // TODO: add shipping price
  @Field()
  @Property({ required: true })
  price!: number;
}

export const OrderItemModel = getModelForClass(OrderItem);
