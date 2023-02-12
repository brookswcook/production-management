import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { FitSample, FitSampleModel } from "./sample.model";
import { SendSampleInput, UniqueSampleInput } from "./sample.input";
import { UserRole } from "dashboard-core";
import { TenantId } from "../user/user.decorator";

@Resolver(FitSample)
export class FitSampleResolver {
  @Authorized(["Admin", "Factory:.+"] as UserRole[])
  @Mutation(() => FitSample)
  async sendFitSample(
    @TenantId() companyId: string,
    @Arg("data") { ...data }: SendSampleInput
  ): Promise<FitSample> {
    return FitSampleModel.sendSample({ ...data, companyId });
  }

  @Authorized(["Admin", "Factory:.+"] as UserRole[])
  @Mutation(() => FitSample)
  async markFitSampleAsDelivered(
    @TenantId() companyId: string,
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FitSample> {
    return FitSampleModel.markAsDelivered(companyId, parentCode, sku);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => FitSample)
  async rejectFitSample(
    @TenantId() companyId: string,
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FitSample> {
    return FitSampleModel.rejectSample(companyId, parentCode, sku);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => FitSample)
  async approveFitSample(
    @TenantId() companyId: string,
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FitSample> {
    return FitSampleModel.approveSample(companyId, parentCode, sku);
  }
}
