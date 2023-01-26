import { UserRole } from "dashboard-core";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { ResolverContext } from "../../lib/graphql";
import { CreateOrderInput } from "./orderItem.input";
import { OrderItem, OrderItemModel } from "./orderItem.model";

@Resolver(OrderItem)
export class OrderItemResolver {
  @Authorized<UserRole>(["Admin", "VChapman"])
  @Mutation(() => OrderItem)
  async createOrderItem(
    @Ctx() { user: { companyId } }: ResolverContext,
    @Arg("data") data: CreateOrderInput
  ): Promise<OrderItem> {
    return new OrderItemModel({ ...data, companyId }).save();
  }
}
