import { Field, ObjectType } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";

@ObjectType()
export class ProductShipping {
  @Field()
  @Property()
  lastShippingDate!: Date;

  @Field()
  @Property()
  actualShippingDate?: Date;

  @Field()
  @Property()
  shipped?: boolean;

  @Field()
  @Property()
  trackNumber?: string;

  @Field()
  @Property()
  delivered?: boolean;
}
