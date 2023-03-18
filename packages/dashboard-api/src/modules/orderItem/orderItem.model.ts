import {
  getModelForClass,
  index,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Attribute } from "../attribute/attribute.model";
import { Product } from "../product/product.model";

@index<OrderItem>({ companyId: 1, orderUid: 1 })
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
  ): Promise<OrderItemsGroupedByAttributes[]> {
    return await OrderItemModel.aggregate<OrderItemsGroupedByAttributes>([
      {
        $project: {
          _id: 0,
          companyId: 1,
          orderUid: 1,
          productCode: 1,
          variantAttributes: 1,
          quantity: 1,
          price: 1,
        },
      },
      { $match: { companyId: companyId, orderUid: orderUid } },
      {
        $group: {
          _id: {
            productCode: "$productCode",
            key: "$variantAttributes.key",
            value: "$variantAttributes.value",
            unitPrice: "$price",
          },
          qty: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          productCode: "$_id.productCode",
          attributes: {
            $zip: {
              inputs: ["$_id.key", "$_id.value"],
            },
          },
          qty: "$qty",
          unitPrice: "$_id.unitPrice",
          extPrice: { $multiply: ["$qty", "$_id.unitPrice"] },
        },
      },
    ]).exec();
  }
}

export const OrderItemModel = getModelForClass(OrderItem);

@ObjectType()
export class OrderItemsGroupedByAttributes {
  @Field()
  productCode!: string;

  @Field(() => [[String, String]])
  attributes!: [string, string][];

  @Field()
  qty!: number;

  @Field()
  unitPrice!: number;

  @Field()
  extPrice!: number;
}
