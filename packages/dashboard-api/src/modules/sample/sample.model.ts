import { prop as Property } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

// Partially it's used as embedded document of product - fabricSample
@ObjectType()
export class Sample {
  @Field()
  @Property()
  sku!: string;

  @Field({ nullable: true })
  @Property({ default: false })
  approved?: boolean;

  @Field()
  @Property()
  trackNumber!: string;

  @Field({ nullable: true })
  @Property({ default: false })
  delivered?: boolean;
}
