import { Field, InputType } from "type-graphql";

@InputType()
export class StartProductionInput {
  @Field()
  productName!: string;
}
