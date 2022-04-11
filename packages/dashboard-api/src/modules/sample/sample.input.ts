import { Field, InputType } from "type-graphql";

@InputType()
export class SendSampleInput {
  @Field()
  productCode!: string;

  @Field()
  sku!: string;

  @Field()
  trackNumber!: string;
}

@InputType()
export class UniqueSampleInput {
  @Field()
  productCode!: string;

  @Field()
  sku!: string;
}
