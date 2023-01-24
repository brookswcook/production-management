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
  @Authorized<UserRole>(["Admin", "VChapman"])
  @Query(() => [PurchaseOrder])
  async purchaseOrders(
    @Ctx() { user: { companyId } }: ResolverContext
  ): Promise<PurchaseOrder[]> {
    return PurchaseOrderModel.find({ companyId }).exec();
  }

  @Authorized<UserRole>(["Admin", "VChapman"])
  @Query(() => PurchaseOrder, { nullable: true })
  async purchaseOrder(
    @Arg("uid", () => Int) uid: number,
    @Ctx() { user: { companyId } }: ResolverContext
  ): Promise<PurchaseOrder | null> {
    return PurchaseOrderModel.findOne({ companyId, uid }).exec();
  }

  @Authorized<UserRole>(["Admin", "VChapman"])
  @Mutation(() => PurchaseOrder)
  async createPurchaseOrder(
    @Arg("data") data: CreatePurchaseOrderInput,
    @Ctx() { user: { companyId } }: ResolverContext
  ): Promise<PurchaseOrder> {
    const uid = await PurchaseOrderModel.getNextUID();
    return new PurchaseOrderModel({
      uid,
      companyId,
      ...data,
    }).save();
  }
}
