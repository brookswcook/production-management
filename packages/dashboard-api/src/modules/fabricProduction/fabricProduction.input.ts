import { Field, InputType } from "type-graphql";

@InputType()
export class StartFabricProductionInput {
  @Field()
  productName!: string;
}
