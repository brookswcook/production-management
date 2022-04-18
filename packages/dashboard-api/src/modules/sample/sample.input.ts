import { Field, InputType } from "type-graphql";

@InputType()
export class SendSampleInput {
  @Field()
  parentCode!: string;

  @Field()
  sku!: string;

  @Field()
  trackNumber!: string;
}

@InputType()
export class UniqueSampleInput {
  @Field()
  parentCode!: string;

  @Field()
  sku!: string;
}

@InputType()
export class RejectSampleInput extends UniqueSampleInput {
  @Field({ nullable: true })
  rejectionText?: string;
}
