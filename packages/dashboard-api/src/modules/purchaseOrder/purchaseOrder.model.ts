import { Field, ObjectType } from "type-graphql";
import {
  getModelForClass,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

@ModelOptions({ schemaOptions: { timestamps: true } })
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

  // company
  @Property({ required: true })
  recipientId!: string;

  // factory
  @Property({ required: true })
  supplierId!: string;
}

export const PurchaseOrderModel = getModelForClass(PurchaseOrder);
