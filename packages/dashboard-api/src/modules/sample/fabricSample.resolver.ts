import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { FabricSample, FabricSampleModel } from "./sample.model";
import { SendSampleInput, UniqueSampleInput } from "./sample.input";

@Resolver(FabricSample)
export class FabricSampleResolver {
  @Authorized()
  @Mutation(() => FabricSample)
  async sendFabricSample(
    @Arg("data") { ...data }: SendSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.sendSample(data);
  }

  @Authorized()
  @Mutation(() => FabricSample)
  unApproveFabricSample(
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.unApproveSample(parentCode, sku);
  }

  @Authorized()
  @Mutation(() => FabricSample)
  async approveFabricSample(
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.approveSample(parentCode, sku);
  }
}
