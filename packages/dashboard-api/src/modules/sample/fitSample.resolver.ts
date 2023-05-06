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
import { UserActionLogWithNotification } from "../../lib/userActionLogMiddleware";
import { TenantId } from "../user/user.decorator";
import { Service } from "typedi";

@Service()
@Resolver(FitSample)
export class FitSampleResolver {
  @Authorized(["Admin", "Factory"] as UserRole[])
  @Mutation(() => FitSample)
  @UseMiddleware(
    UserActionLogWithNotification<FitSample>("New fit sample is sent", [
      "Admin",
      "VChapman",
      "Factory",
    ])
  )
  async sendFitSample(
    @TenantId() companyId: string,
    @Arg("data") { ...data }: SendSampleInput
  ): Promise<FitSample> {
    return FitSampleModel.sendSample({ ...data, companyId });
  }

  @Authorized(["Admin", "Factory"] as UserRole[])
  @Mutation(() => FitSample)
  @UseMiddleware(
    UserActionLogWithNotification<FitSample>("Fit sample is delivered", [
      "Admin",
      "VChapman",
      "Factory",
    ])
  )
  async markFitSampleAsDelivered(
    @TenantId() companyId: string,
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FitSample> {
    return FitSampleModel.markAsDelivered(companyId, parentCode, sku);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => FitSample)
  @UseMiddleware(
    UserActionLogWithNotification<FitSample>("Fit sample is rejected", [
      "Admin",
      "VChapman",
      "Factory",
    ])
  )
  async rejectFitSample(
    @TenantId() companyId: string,
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FitSample> {
    return FitSampleModel.rejectSample(companyId, parentCode, sku);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => FitSample)
  @UseMiddleware(
    UserActionLogWithNotification<FitSample>("Fit sample is approved", [
      "Admin",
      "VChapman",
      "Factory",
    ])
  )
  async approveFitSample(
    @TenantId() companyId: string,
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FitSample> {
    return FitSampleModel.approveSample(companyId, parentCode, sku);
  }
}
