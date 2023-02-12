import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { FabricSample, FabricSampleModel } from "./sample.model";
import { SendSampleInput, UniqueSampleInput } from "./sample.input";
import { UserRole } from "dashboard-core";
import { TenantId } from "../user/user.decorator";

@Resolver(FabricSample)
export class FabricSampleResolver {
  @Authorized(["Admin", "Factory"] as UserRole[])
  @Mutation(() => FabricSample)
  async sendFabricSample(
    @TenantId() companyId: string,
    @Arg("data") { ...data }: SendSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.sendSample(data);
  }

  @Authorized(["Admin", "Factory"] as UserRole[])
  @Mutation(() => FabricSample)
  async markFabricSampleAsDelivered(
    @TenantId() companyId: string,
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.markAsDelivered(companyId, parentCode, sku);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => FabricSample)
  async rejectFabricSample(
    @TenantId() companyId: string,
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.rejectSample(companyId, parentCode, sku);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => FabricSample)
  async approveFabricSample(
    @TenantId() companyId: string,
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.approveSample(companyId, parentCode, sku);
  }
}
