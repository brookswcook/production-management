import { Field, InputType } from "type-graphql";

@InputType()
export class CreateProductInput {
  @Field()
  styleCode!: string;

  @Field()
  fabricCode!: string;

  @Field()
  factoryName!: string;

  @Field()
  deliveryDate!: Date;
}

@InputType()
export class GetProductsInput {
  @Field()
  factoryName!: string;
}
