import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Factory {
  @Field()
  @Property({ required: true })
  code!: string;

  @Field()
  @Property({ required: true })
  name!: string;

  @Field()
  @Property({ required: true })
  address!: string;

  @Field({ nullable: true })
  @Property()
  email?: string;
}

export const FactoryModel = getModelForClass(Factory);
