import { Field, InputType } from "type-graphql";

@InputType()
export class CreateProductInput {
  @Field()
  model!: string;

  @Field()
  style!: string;

  @Field()
  sku!: string;

  @Field()
  deliveryDate!: Date;
}
