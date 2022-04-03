import { Field, ObjectType } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";

@ObjectType()
export class ProductShipping {
  @Field()
  @Property()
  lastShippingDate!: Date;

  @Field({ nullable: true })
  @Property()
  actualShippingDate?: Date;

  @Field()
  @Property({ default: false })
  shipped?: boolean;

  @Field({ nullable: true })
  @Property()
  trackNumber?: string;

  @Field({ nullable: true })
  @Property()
  delivered?: boolean;
}
