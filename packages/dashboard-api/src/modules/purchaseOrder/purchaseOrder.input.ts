import { Field, InputType } from "type-graphql";

@InputType()
export class CreatePurchaseOrderInput {
  @Field()
  expectedDeliveryDate!: Date;

  @Field()
  companyCode!: string;

  @Field()
  factoryCode!: string;
}
