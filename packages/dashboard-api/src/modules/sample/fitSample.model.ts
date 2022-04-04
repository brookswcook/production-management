import {
  ReturnModelType,
  prop as Property,
  getModelForClass,
  modelOptions,
  index,
} from "@typegoose/typegoose";
import { ObjectType } from "type-graphql";
import { Sample } from "./sample.model";

@index<FitSample>({ productName: 1, sku: 1 }, { unique: true })
@ObjectType()
@modelOptions({ schemaOptions: { collection: "fit_samples" } })
export class FitSample extends Sample {
  //@Field({ nullable: false })
  @Property({ required: true, index: true })
  productName!: string;

  static getFitSamplesByProductName(
    this: ReturnModelType<typeof FitSample>,
    productName: string,
    params: Partial<Omit<FitSample, "productName">> = {}
  ): Promise<FitSample[]> {
    return this.find({ productName, ...params }).exec();
  }
}

export const FitSampleModel = getModelForClass(FitSample);
