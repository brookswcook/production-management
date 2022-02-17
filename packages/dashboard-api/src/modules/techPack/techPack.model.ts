import { prop as Property } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

// It's used as embedded document of product so there's no need to get a model through getModelForClass
// otherwise typegoose will create dedicated collection which is not needed
@ObjectType()
export class TechPack {
  @Field()
  @Property()
  fabricCode!: string;

  @Field()
  @Property()
  type!: string;

  @Field()
  @Property()
  print!: string;

  @Field()
  @Property()
  pantone!: string;

  @Field()
  @Property()
  color!: string;
}
