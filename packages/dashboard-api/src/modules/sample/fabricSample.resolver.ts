import {
  Arg,
  Authorized,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { FabricSample, FabricSampleModel } from "./sample.model";
import { SendSampleInput, UniqueSampleInput } from "./sample.input";
import { UserRole } from "dashboard-core";
import { UserActionLogWithNotification } from "../../lib/userActionLogMiddleware";
import { TenantId } from "../user/user.decorator";
import { Service } from "typedi";

@Service()
@Resolver(FabricSample)
export class FabricSampleResolver {
  @Authorized(["Admin", "Factory"] as UserRole[])
  @Mutation(() => FabricSample)
  @UseMiddleware(
    UserActionLogWithNotification<FabricSample>("New fabric sample is sent", [
      "Admin",
      "VChapman",
      "Factory",
    ])
  )
  async sendFabricSample(
    @TenantId() companyId: string,
    @Arg("data") { ...data }: SendSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.sendSample({ ...data, companyId });
  }

  @Authorized(["Admin", "Factory"] as UserRole[])
  @Mutation(() => FabricSample)
  @UseMiddleware(
    UserActionLogWithNotification<FabricSample>("Fabric sample is delivered", [
      "Admin",
      "VChapman",
      "Factory",
    ])
  )
  async markFabricSampleAsDelivered(
    @TenantId() companyId: string,
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.markAsDelivered(companyId, parentCode, sku);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => FabricSample)
  @UseMiddleware(
    UserActionLogWithNotification<FabricSample>("Fabric sample is rejected", [
      "Admin",
      "VChapman",
      "Factory",
    ])
  )
  async rejectFabricSample(
    @TenantId() companyId: string,
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.rejectSample(companyId, parentCode, sku);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => FabricSample)
  @UseMiddleware(
    UserActionLogWithNotification<FabricSample>("Fabric sample is approved", [
      "Admin",
      "VChapman",
      "Factory",
    ])
  )
  async approveFabricSample(
    @TenantId() companyId: string,
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.approveSample(companyId, parentCode, sku);
  }
}
