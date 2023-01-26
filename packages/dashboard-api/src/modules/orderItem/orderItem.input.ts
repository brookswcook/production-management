import { ProductSizes } from "dashboard-core";
import { Field, InputType } from "type-graphql";

@InputType()
class OrderItemAttributeInput {
  @Field({ nullable: true })
  size?: ProductSizes;
}

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

  @Field()
  quantity!: number;

  @Field(() => [OrderItemAttributeInput])
  variantAttributes!: OrderItemAttributeInput[];

  @Field()
  price!: number;
}
