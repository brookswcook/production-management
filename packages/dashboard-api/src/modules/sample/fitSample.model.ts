import {
  ReturnModelType,
  prop as Property,
  getModelForClass,
  modelOptions,
} from "@typegoose/typegoose";
import { ObjectType } from "type-graphql";
import { Sample } from "./sample.model";

@ObjectType()
@modelOptions({ schemaOptions: { collection: "fit_samples" } })
export class FitSample extends Sample {
  //@Field({ nullable: false })
  @Property({ required: true })
  productName!: string;

  static async getFitSamplesByProductName(
    this: ReturnModelType<typeof FitSample>,
    productName: string,
    params: Partial<Omit<FitSample, "productName">> = {}
  ): Promise<FitSample[]> {
    return this.find({ productName, ...params }).exec();
  }
}

export const FitSampleModel = getModelForClass(FitSample);
