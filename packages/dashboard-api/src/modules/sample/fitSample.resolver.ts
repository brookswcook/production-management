import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { FitSample, FitSampleModel } from "./fitSample.model";
import { SendSampleInput, UniqueSampleInput } from "./sample.input";

@Resolver(FitSample)
export class FitSampleResolver {
  @Authorized()
  @Mutation(() => FitSample)
  async sendFitSample(
    @Arg("data") { ...data }: SendSampleInput
  ): Promise<FitSample> {
    const unapprovedFitSample = await FitSampleModel.getFitSamplesByProductCode(
      data.productCode,
      { delivered: false }
    );
    if (unapprovedFitSample.length > 0)
      // TODO: use proper validation error
      throw new Error(
        "Given product already has sent and not delivered fit sample!"
      );
    return new FitSampleModel(data).save();
  }

  @Authorized()
  @Mutation(() => FitSample)
  async approveFitSample(
    @Arg("data") { productCode, sku }: UniqueSampleInput
  ): Promise<FitSample> {
    const fitSample = await FitSampleModel.findOneAndUpdate(
      {
        productCode,
        sku,
      } as FitSample,
      { $set: { delivered: true, approved: true } as Partial<FitSample> },
      { returnOriginal: false }
    ).exec();
    if (fitSample == null) throw Error(`Fit sample is not found`);
    return fitSample;
  }
}
