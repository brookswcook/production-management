import { prop as Property } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

// It's used as embedded document of product so there's no need to get a model through getModelForClass
// otherwise typegoose will create dedicated collection which is not needed
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
