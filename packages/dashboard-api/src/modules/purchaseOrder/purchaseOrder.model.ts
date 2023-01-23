import { Field, ObjectType } from "type-graphql";
import {
  getModelForClass,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

@ModelOptions({
  schemaOptions: { timestamps: true, collection: "purchase_orders" },
})
@ObjectType()
export class PurchaseOrder implements TimeStamps {
  @Field()
  @Property({
    required: true,
    unique: true,
  })
  uid!: number;

  // @Field()
  // @Property({ required: true, unique: true })
  // code!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field()
  @Property({ required: true })
  expectedDeliveryDate!: Date;

  // @Field()
  // @Property({ required: true })
  // items!: OrderItem[];

  @Field()
  @Property({ required: true })
  companyId!: string;

  @Field()
  @Property({ required: true })
  factoryCode!: string;

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
