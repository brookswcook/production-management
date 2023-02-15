import { Field, Int, ObjectType } from "type-graphql";
import {
  getModelForClass,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Company } from "../company/company.model";
import { ExpectResultModel } from "../common/expectResultModel";
import { OrderItem } from "../orderItem/orderItem.model";
import { PurchaseOrderStatus, purchaseOrderStatusSet } from "dashboard-core";

@ModelOptions({
  schemaOptions: { timestamps: true, collection: "purchase_orders" },
})
@ObjectType()
export class PurchaseOrder extends ExpectResultModel implements TimeStamps {
  @Field()
  id!: string;

  @Field(() => Int)
  @Property({
    required: true,
    unique: true,
  })
  uid!: number;

  // @Field()
  // @Property({ required: true, unique: true })
  // code!: string;

  @Field()
  @Property({
    required: true,
    default: purchaseOrderStatusSet[0],
    enum: purchaseOrderStatusSet,
  })
  status!: PurchaseOrderStatus;

  @Field(() => String, { nullable: true })
  @Property({
    type: () => String,
    get(this: PurchaseOrder) {
      const current = purchaseOrderStatusSet.indexOf(this.status);
      // keeping in mind that last one is cancelled
      if (current < purchaseOrderStatusSet.length - 2)
        return purchaseOrderStatusSet[current + 1];
      else return null;
    },
  })
  nextStatus!: PurchaseOrderStatus | null;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field()
  @Property({ required: true })
  expectedDeliveryDate!: Date;

  @Field(() => [OrderItem])
  @Property({
    ref: () => OrderItem,
    foreignField: "orderUid",
    localField: "uid",
  })
  items!: OrderItem[];

  @Property({ required: true })
  companyId!: string;

  @Field()
  @Property({
    ref: () => Company,
    foreignField: "_id",
    localField: "companyId",
    justOne: true,
  })
  company!: Company;

  @Property({ required: true })
  factoryId!: string;

  @Field()
  @Property({
    ref: () => Company,
    foreignField: "_id",
    localField: "factoryId",
    justOne: true,
  })
  factory!: Company;

  static async getNextUID() {
    const [{ uid } = { uid: 0 }] = await PurchaseOrderModel.aggregate<
      Pick<PurchaseOrder, "uid">
    >([
      { $project: { _id: 0, uid: 1 } },
      { $sort: { uid: -1 } },
      { $limit: 1 },
    ]).exec();

    return uid + 1;
  }
}

export const PurchaseOrderModel = getModelForClass(PurchaseOrder);
