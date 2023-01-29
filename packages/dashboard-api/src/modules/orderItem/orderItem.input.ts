import { Field, InputType } from "type-graphql";
import { CreateAttributeInput } from "../attribute/attribute.input";

@InputType()
export class GetOrderItemsInput {
  @Field()
  orderUid!: number;
}

@InputType()
export class CreateOrderItemInput {
  @Field()
  orderUid!: number;

  @Field()
  productCode!: string;

  @Field({ nullable: true })
  quantity?: number;

  @Field(() => [CreateAttributeInput], { nullable: true })
  variantAttributes?: CreateAttributeInput[];

  @Field()
  price!: number;
}
