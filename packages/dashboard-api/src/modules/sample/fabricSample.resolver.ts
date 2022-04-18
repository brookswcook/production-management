import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { FabricSample, FabricSampleModel } from "./sample.model";
import {
  RejectSampleInput,
  SendSampleInput,
  UniqueSampleInput,
} from "./sample.input";

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
  async rejectFabricSample(
    @Arg("data") { parentCode, sku, rejectionText }: RejectSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.rejectSample(parentCode, sku, rejectionText);
  }

  @Authorized()
  @Mutation(() => FabricSample)
  async approveFabricSample(
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.approveSample(parentCode, sku);
  }
}
