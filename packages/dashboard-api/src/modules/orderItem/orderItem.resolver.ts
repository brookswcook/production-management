import { Arg, Mutation, Resolver } from "type-graphql";
import { CreateOrderInput } from "./orderItem.input";
import { OrderItem, OrderItemModel } from "./orderItem.model";

@Resolver(OrderItem)
export class OrderItemResolver {
  @Mutation(() => OrderItem)
  async createOrderItem(@Arg("data") data: CreateOrderInput) {
    return new OrderItemModel(data).save();
  }
}
