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
        $project: {
          productCode: 1,
          quantity: 1,
          price: 1,
          attributes: "$variantAttributes",
        },
      },
      {
        $group: {
          _id: { productCode: "$productCode", price: "$price" },
          quantity: { $sum: "$quantity" },
          variantSets: {
            $push: { quantity: "$quantity", attributes: "$attributes" },
          },
        },
      },
      {
        $project: {
          _id: 0,
          productCode: "$_id.productCode",
          unitPrice: "$_id.price",
          quantity: 1,
          extPrice: { $multiply: ["$quantity", "$_id.price"] },
          variantSets: 1,
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

  @Field(() => [VariantSet])
  variantSets!: VariantSet[];

  @Field()
  quantity!: number;

  @Field()
  unitPrice!: number;

  @Field()
  extPrice!: number;
}

@ObjectType()
export class VariantSet {
  @Field()
  quantity!: number;

  @Field(() => [Attribute])
  attributes!: Attribute[];
}
