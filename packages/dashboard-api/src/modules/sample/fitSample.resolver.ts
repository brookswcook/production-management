import { Arg, Mutation, Resolver } from "type-graphql";
import { FitSample, FitSampleModel } from "./fitSample.model";
import { SendSampleInput } from "./sample.input";

@Resolver(FitSample)
export class FitSampleResolver {
  @Mutation(() => FitSample)
  async sendFitSample(
    @Arg("data") { ...data }: SendSampleInput
  ): Promise<FitSample> {
    const unapprovedFitSample = await FitSampleModel.getFitSamplesByProductName(
      data.productName,
      { approved: false }
    );
    if (unapprovedFitSample.length > 0)
      // TODO: use proper validation error
      throw new Error("Given product has unapproved fit sample!");
    return new FitSampleModel(data).save();
  }
}
