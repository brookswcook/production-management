import { Field, ObjectType } from "type-graphql";
import {
  getModelForClass,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

// Note: can it be called productionOrder?
@ModelOptions({
  schemaOptions: { timestamps: true, collection: "purchase_orders" },
})
@ObjectType()
export class PurchaseOrder implements TimeStamps {
  @Field()
  @Property({ required: true, unique: true })
  code!: string;

  @Field()
  @Property({ required: true })
  createdAt!: Date;

  @Field()
  @Property({ required: true })
  updatedAt!: Date;

  @Field()
  @Property({ required: true })
  expectedDeliveryDate!: Date;

  // @Field()
  // @Property({ required: true })
  // items!: OrderItem[];

  @Field()
  @Property({ required: true })
  companyCode!: string;

  @Field()
  @Property({ required: true })
  factoryCode!: string;
}

export const PurchaseOrderModel = getModelForClass(PurchaseOrder);
