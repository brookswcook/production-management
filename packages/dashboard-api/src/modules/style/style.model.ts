import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Style {
  @Field()
  @Property({ required: true, unique: true })
  code!: string;

  @Field()
  @Property({ required: true })
  name!: string;

  @Field({ nullable: true })
  @Property()
  techPackUrl?: string;
}

export const StyleModel = getModelForClass(Style);
