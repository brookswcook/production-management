import { ObjectType, Field } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";

@ObjectType()
export class Attribute {
  @Field()
  @Property()
  key!: string;

  @Field()
  @Property()
  value!: string;

  @Field()
  @Property()
  unit?: string;
}
