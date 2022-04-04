import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { FitSample, FitSampleModel } from "./fitSample.model";
import { SendSampleInput } from "./sample.input";

@Resolver(FitSample)
export class FitSampleResolver {
  @Authorized()
  @Mutation(() => FitSample)
  async sendFitSample(
    @Arg("data") { ...data }: SendSampleInput
  ): Promise<FitSample> {
    const unapprovedFitSample = await FitSampleModel.getFitSamplesByProductName(
      data.productName,
      { delivered: false }
    );
    if (unapprovedFitSample.length > 0)
      // TODO: use proper validation error
      throw new Error(
        "Given product already has sent and not delivered fit sample!"
      );
    return new FitSampleModel(data).save();
  }
}
