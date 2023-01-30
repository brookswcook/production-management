import { Field, InputType } from "type-graphql";

@InputType()
export class CreatePurchaseOrderInput {
  @Field()
  expectedDeliveryDate!: Date;

  @Field()
  factoryId!: string;
}

@InputType()
export class GetPurchaseOrderInput {
  @Field()
  uid!: number;
}
