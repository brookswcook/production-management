import {
  getModelForClass,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Attribute } from "../attribute/attribute.model";
import { Product } from "../product/product.model";
import { PurchaseOrder } from "../purchaseOrder/purchaseOrder.model";

@ModelOptions({
  schemaOptions: { collection: "order_items" },
})
@ObjectType()
export class OrderItem {
  @Field()
  id!: string;

  @Property({ required: true })
  orderUid!: number;

  @Field()
  @Property({
    ref: () => PurchaseOrder,
    foreignField: "uid",
    localField: "orderUid",
    justOne: true,
  })
  purchaseOrder!: PurchaseOrder;

  @Property({ required: true })
  productCode!: string;

  @Field()
  @Property({
    ref: () => Product,
    foreignField: "code",
    localField: "productCode",
    justOne: true,
  })
  product!: Product;

  @Property({ required: true })
  companyId!: string;

  @Field()
  @Property({ required: true, default: 1 })
  quantity!: number;

  @Field(() => [Attribute])
  @Property({
    type: () => [Attribute],
    required: true,
    default: [],
    _id: false,
  })
  variantAttributes!: Attribute[];

  @Field()
  @Property({ required: true })
  price!: number;
}

export const OrderItemModel = getModelForClass(OrderItem);
