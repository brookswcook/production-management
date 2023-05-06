import { UserRole } from "dashboard-core";
import {
  Arg,
  Authorized,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import { UserActionLog } from "../../lib/userActionLogMiddleware";
import { TenantId } from "../user/user.decorator";
import { CreateOrderItemInput, GetOrderItemsInput } from "./orderItem.input";
import {
  OrderItem,
  OrderItemModel,
  OrderItemsGroupedByAttributes,
} from "./orderItem.model";

@Service()
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

  @Query(() => [OrderItemsGroupedByAttributes])
  async orderItemsGroupedByAttributes(
    @TenantId() companyId: string,
    @Arg("data") { orderUid }: GetOrderItemsInput
  ): Promise<OrderItemsGroupedByAttributes[]> {
    return OrderItemModel.getOrderItemsGroupedByAttributes(companyId, orderUid);
  }

  @Authorized<UserRole>(["Admin", "VChapman"])
  @Mutation(() => OrderItem)
  @UseMiddleware(UserActionLog<OrderItem>("New order item is added"))
  async createOrderItem(
    @TenantId() companyId: string,
    @Arg("data") data: CreateOrderItemInput
  ): Promise<OrderItem> {
    return new OrderItemModel({ ...data, companyId }).save();
  }
}
