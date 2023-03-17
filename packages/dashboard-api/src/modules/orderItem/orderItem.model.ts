import {
  getModelForClass,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Attribute } from "../attribute/attribute.model";
import { Product } from "../product/product.model";

@ModelOptions({
  schemaOptions: { collection: "order_items" },
})
@ObjectType()
export class OrderItem {
  @Field()
  id!: string;

  @Property({ required: true })
  orderUid!: number;

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
    default: [],
    _id: false,
  })
  variantAttributes!: Attribute[];

  @Field()
  @Property({ required: true })
  price!: number;

  static async getOrderItemsGroupedByAttributes(
    companyId: string,
    orderUid: number
  ) {
    return await OrderItemModel.aggregate<{
      productCode: string;
      keys: string[];
      values: string[];
      qty: number;
    }>([
      { $match: { companyId, orderUid } },
      {
        $group: {
          _id: {
            productCode: "$productCode",
            key: "$variantAttributes.key",
            value: "$variantAttributes.value",
          },
          qty: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          productCode: "$_id.productCode",
          keys: "$_id.key",
          values: "$_id.value",
          qty: "$qty",
        },
      },
    ]).exec();
  }
}

export const OrderItemModel = getModelForClass(OrderItem);
