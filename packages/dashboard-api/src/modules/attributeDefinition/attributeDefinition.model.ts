import {
  getModelForClass,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

// TODO: Add attribute definition groups
@ModelOptions({
  schemaOptions: { collection: "attribute_definitions" },
})
@ObjectType()
export class AttributeDefinition {
  @Property({ required: true })
  companyId!: string;

  @Field()
  @Property({ required: true })
  name!: string;

  @Field(() => [String])
  @Property({ type: [String], required: true })
  values!: [string];

  @Field({ nullable: true })
  @Property()
  unit?: string;
}

export const AttributeDefinitionModel = getModelForClass(AttributeDefinition);
