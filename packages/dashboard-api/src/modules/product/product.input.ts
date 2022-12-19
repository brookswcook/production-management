import { Field, InputType } from "type-graphql";
import { IFactoryTenant } from "../factory/types";

@InputType()
export class CreateProductInput implements IFactoryTenant {
  @Field()
  styleCode!: string;

  @Field()
  fabricCode!: string;

  @Field()
  factoryCode!: string;

  @Field()
  deliveryDate!: Date;
}

@InputType()
export class GetProductsInput {
  @Field()
  factoryCode!: string;
}
