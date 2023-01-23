import { ProductSizes } from "dashboard-core";
import { Field, InputType } from "type-graphql";

@InputType()
class OrderItemAttributeInput {
  @Field({ nullable: true })
  size?: ProductSizes;
}

@InputType()
export class CreateOrderInput {
  @Field()
  orderUid!: number;

  @Field()
  productCode!: string;

  @Field()
  companyId!: string;

  @Field()
  quantity!: number;

  @Field(() => [OrderItemAttributeInput])
  variantAttributes!: OrderItemAttributeInput[];

  @Field()
  price!: number;
}
