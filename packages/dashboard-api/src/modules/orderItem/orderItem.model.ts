import {
  getModelForClass,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

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
  @Property({ required: true, default: 1 })
  quantity!: number;

  // TODO: it might be better to introduce variants with these attributes as size and other
  @Field()
  @Property({ required: true })
  size!: number;

  // TODO: decide where to keep the price, maybe it should be a part of a product; or a separate entity with reference to a product
  // Note: it looks like it's production price i.e should be set/calculated by factory
  // TODO: rename to productionPrice
  // TODO: add shipping price
  @Field()
  @Property({ required: true })
  price!: number;
}

export const OrderItemModel = getModelForClass(OrderItem);
