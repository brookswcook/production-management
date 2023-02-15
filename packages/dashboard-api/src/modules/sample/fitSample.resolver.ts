import {
  Arg,
  Authorized,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { FitSample, FitSampleModel } from "./sample.model";
import { SendSampleInput, UniqueSampleInput } from "./sample.input";
import { UserRole } from "dashboard-core";
import { UserActionLog } from "../../lib/userActionLogMiddleware";
import { TenantId } from "../user/user.decorator";

@Resolver(FitSample)
export class FitSampleResolver {
  @Authorized(["Admin", "Factory"] as UserRole[])
  @Mutation(() => FitSample)
  @UseMiddleware(UserActionLog<FitSample>("New fit sample is sent"))
  async sendFitSample(
    @TenantId() companyId: string,
    @Arg("data") { ...data }: SendSampleInput
  ): Promise<FitSample> {
    return FitSampleModel.sendSample({ ...data, companyId });
  }

  @Authorized(["Admin", "Factory"] as UserRole[])
  @Mutation(() => FitSample)
  @UseMiddleware(UserActionLog<FitSample>("Fit sample is delivered"))
  async markFitSampleAsDelivered(
    @TenantId() companyId: string,
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FitSample> {
    return FitSampleModel.markAsDelivered(companyId, parentCode, sku);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => FitSample)
  @UseMiddleware(UserActionLog<FitSample>("Fit sample is rejected"))
  async rejectFitSample(
    @TenantId() companyId: string,
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FitSample> {
    return FitSampleModel.rejectSample(companyId, parentCode, sku);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => FitSample)
  @UseMiddleware(UserActionLog<FitSample>("Fit sample is approved"))
  async approveFitSample(
    @TenantId() companyId: string,
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FitSample> {
    return FitSampleModel.approveSample(companyId, parentCode, sku);
  }
}
