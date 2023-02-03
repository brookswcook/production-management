import { UserRole } from "dashboard-core";
import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { ResolverContext } from "../../lib/graphql";
import { CreatePurchaseOrderInput } from "./purchaseOrder.input";
import { PurchaseOrder, PurchaseOrderModel } from "./purchaseOrder.model";

@Resolver(PurchaseOrder)
export class PurchaseOrderResolver {
  @Authorized()
  @Query(() => [PurchaseOrder])
  async purchaseOrders(
    @Ctx() { user: { companyId } }: ResolverContext
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
    @Ctx() { user: { companyId } }: ResolverContext
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
  async createPurchaseOrder(
    @Arg("data") data: CreatePurchaseOrderInput,
    @Ctx() { user: { companyId } }: ResolverContext
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
  async pushPurchaseOrderToNextStage(
    @Arg("uid", () => Int) uid: number,
    @Ctx() { user: { companyId } }: ResolverContext
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
