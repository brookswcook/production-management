import { Field, InputType } from "type-graphql";

@InputType()
export class SendSampleInput {
  @Field()
  productName!: string;

  @Field()
  sku!: string;

  @Field()
  trackNumber!: string;
}

@InputType()
export class UniqueSampleInput {
  @Field()
  productName!: string;

  @Field()
  sku!: string;
}
