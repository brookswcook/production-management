import {
  getModelForClass,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ModelOptions({
  schemaOptions: { collection: "product_attributes" },
})
@ObjectType()
export class ProductAttribute {
  @Property({ required: true })
  companyId!: string;

  @Field()
  @Property({ required: true })
  name!: string;

  @Field(() => [String])
  @Property({ required: true })
  values!: [string];

  @Field({ nullable: true })
  @Property()
  unit?: string;
}

export const ProductAttributeModel = getModelForClass(ProductAttribute);
