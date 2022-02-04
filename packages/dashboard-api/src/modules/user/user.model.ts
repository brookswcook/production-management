import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  @Property()
  public name!: string;

  @Field()
  @Property({ default: new Date(), required: true })
  date!: Date;
}

export const UserModel = getModelForClass(User);
