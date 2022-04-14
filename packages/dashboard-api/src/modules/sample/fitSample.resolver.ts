import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { FitSample, FitSampleModel } from "./sample.model";
import { SendSampleInput, UniqueSampleInput } from "./sample.input";

@Resolver(FitSample)
export class FitSampleResolver {
  @Authorized()
  @Mutation(() => FitSample)
  async sendFitSample(
    @Arg("data") { ...data }: SendSampleInput
  ): Promise<FitSample> {
    return FitSampleModel.sendSample(data);
  }

  @Authorized()
  @Mutation(() => FitSample)
  unApproveFitSample(
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FitSample> {
    return FitSampleModel.unApproveSample(parentCode, sku);
  }

  @Authorized()
  @Mutation(() => FitSample)
  async approveFitSample(
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FitSample> {
    return FitSampleModel.approveSample(parentCode, sku);
  }
}
