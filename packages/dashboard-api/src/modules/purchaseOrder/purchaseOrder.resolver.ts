import { UserRole } from "dashboard-core";
import {
  Arg,
  Authorized,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { UserActionLog } from "../../lib/userActionLogMiddleware";
import { TenantId } from "../user/user.decorator";
import { CreatePurchaseOrderInput } from "./purchaseOrder.input";
import { PurchaseOrder, PurchaseOrderModel } from "./purchaseOrder.model";

@Resolver(PurchaseOrder)
export class PurchaseOrderResolver {
  @Authorized()
  @Query(() => [PurchaseOrder])
  async purchaseOrders(
    @TenantId() companyId: string
  ): Promise<PurchaseOrder[]> {
    return await PurchaseOrderModel.find({ companyId })
      .populate([
        {
          path: "company",
          populate: {
            path: "contacts",
          },
        },
        {
          path: "factory",
          populate: {
            path: "contacts",
          },
        },
        {
          path: "items",
        },
      ])
      .exec();
  }

  @Authorized()
  @Query(() => PurchaseOrder)
  async purchaseOrder(
    @Arg("uid", () => Int) uid: number,
    @TenantId() companyId: string
  ): Promise<PurchaseOrder> {
    return await PurchaseOrderModel.findOneOrFail({ companyId, uid }, [
      {
        path: "company",
        populate: {
          path: "contacts",
        },
      },
      {
        path: "factory",
        populate: {
          path: "contacts",
        },
      },
      {
        path: "items",
      },
    ]);
  }

  @Authorized<UserRole>(["Admin", "VChapman"])
  @Mutation(() => PurchaseOrder)
  @UseMiddleware(UserActionLog<PurchaseOrder>("Purchase order is created"))
  async createPurchaseOrder(
    @Arg("data") data: CreatePurchaseOrderInput,
    @TenantId() companyId: string
  ): Promise<PurchaseOrder> {
    const uid = await PurchaseOrderModel.getNextUID();
    return await new PurchaseOrderModel({
      uid,
      companyId,
      ...data,
    }).save();
  }

  @Authorized()
  @Mutation(() => PurchaseOrder)
  @UseMiddleware(
    UserActionLog<PurchaseOrder>("Purchase order status is updated")
  )
  async pushPurchaseOrderToNextStage(
    @Arg("uid", () => Int) uid: number,
    @TenantId() companyId: string
  ): Promise<PurchaseOrder> {
    const purchaseOrder = await PurchaseOrderModel.findOneOrFail({
      companyId,
      uid,
    });
    if (purchaseOrder.nextStatus == null) return purchaseOrder;
    purchaseOrder.status = purchaseOrder.nextStatus;
    return await purchaseOrder.save();
  }
}
