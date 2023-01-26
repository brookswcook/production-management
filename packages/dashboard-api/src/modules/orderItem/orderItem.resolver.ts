import { UserRole } from "dashboard-core";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ResolverContext } from "../../lib/graphql";
import { CreateOrderItemInput, GetOrderItemsInput } from "./orderItem.input";
import { OrderItem, OrderItemModel } from "./orderItem.model";

@Resolver(OrderItem)
export class OrderItemResolver {
  @Query(() => [OrderItem])
  async orderItems(
    @Ctx() { user: { companyId } }: ResolverContext,
    @Arg("data", { nullable: true }) data: GetOrderItemsInput
  ): Promise<OrderItem[]> {
    return OrderItemModel.find({ ...data, companyId }).exec();
  }

  @Authorized<UserRole>(["Admin", "VChapman"])
  @Mutation(() => OrderItem)
  async createOrderItem(
    @Ctx() { user: { companyId } }: ResolverContext,
    @Arg("data") data: CreateOrderItemInput
  ): Promise<OrderItem> {
    return new OrderItemModel({ ...data, companyId }).save();
  }
}
