import { UserRole } from "dashboard-core";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { TenantId } from "../user/user.decorator";
import { CreateOrderItemInput, GetOrderItemsInput } from "./orderItem.input";
import { OrderItem, OrderItemModel } from "./orderItem.model";

@Resolver(OrderItem)
export class OrderItemResolver {
  @Query(() => [OrderItem])
  async orderItems(
    @TenantId() companyId: string,
    @Arg("data", { nullable: true }) data: GetOrderItemsInput
  ): Promise<OrderItem[]> {
    return OrderItemModel.find({ ...data, companyId })
      .populate([
        {
          path: "product",
        },
      ])
      .exec();
  }

  @Authorized<UserRole>(["Admin", "VChapman"])
  @Mutation(() => OrderItem)
  async createOrderItem(
    @TenantId() companyId: string,
    @Arg("data") data: CreateOrderItemInput
  ): Promise<OrderItem> {
    return new OrderItemModel({ ...data, companyId }).save();
  }
}
