import { Field, InputType } from "type-graphql";

@InputType()
export class CreateProductInput {
  @Field()
  styleCode!: string;

  @Field()
  fabricCode!: string;

  @Field()
  factoryId!: string;

  @Field()
  deliveryDate!: Date;
}

@InputType()
export class UpdateProductionCostInput {
  @Field()
  code!: string;

  @Field()
  productionCost!: number;
}
