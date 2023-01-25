import { Field, Int, ObjectType } from "type-graphql";
import {
  getModelForClass,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Company } from "../company/company.model";

@ModelOptions({
  schemaOptions: { timestamps: true, collection: "purchase_orders" },
})
@ObjectType()
export class PurchaseOrder implements TimeStamps {
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
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field()
  @Property({ required: true })
  expectedDeliveryDate!: Date;

  // @Field()
  // @Property({ required: true })
  // items!: OrderItem[];

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
