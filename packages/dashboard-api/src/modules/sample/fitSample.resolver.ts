import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { FitSample, FitSampleModel } from "./sample.model";
import {
  RejectSampleInput,
  SendSampleInput,
  UniqueSampleInput,
} from "./sample.input";

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
  async rejectFitSample(
    @Arg("data") { parentCode, sku, rejectionText }: RejectSampleInput
  ): Promise<FitSample> {
    return FitSampleModel.rejectSample(parentCode, sku, rejectionText);
  }

  @Authorized()
  @Mutation(() => FitSample)
  async approveFitSample(
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FitSample> {
    return FitSampleModel.approveSample(parentCode, sku);
  }
}
