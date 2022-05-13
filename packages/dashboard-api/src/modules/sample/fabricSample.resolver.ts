import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { FabricSample, FabricSampleModel } from "./sample.model";
import { SendSampleInput, UniqueSampleInput } from "./sample.input";
import { UserRole } from "dashboard-core";

@Resolver(FabricSample)
export class FabricSampleResolver {
  @Authorized(["Admin", "Factory"] as UserRole[])
  @Mutation(() => FabricSample)
  async sendFabricSample(
    @Arg("data") { ...data }: SendSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.sendSample(data);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => FabricSample)
  async rejectFabricSample(
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.rejectSample(parentCode, sku);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => FabricSample)
  async approveFabricSample(
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.approveSample(parentCode, sku);
  }
}
