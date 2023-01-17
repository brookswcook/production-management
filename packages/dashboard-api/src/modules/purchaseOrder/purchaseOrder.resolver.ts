import { Arg, Mutation, Resolver } from "type-graphql";
import { CreatePurchaseOrderInput } from "./purchaseOrder.input";
import { PurchaseOrder, PurchaseOrderModel } from "./purchaseOrder.model";

@Resolver(PurchaseOrder)
export class PurchaseOrderResolver {
  @Mutation(() => PurchaseOrder)
  async createPurchaseOrder(@Arg("data") data: CreatePurchaseOrderInput) {
    const uid = await PurchaseOrderModel.getNextUID();
    return new PurchaseOrderModel({ uid, ...data }).save();
  }
}
