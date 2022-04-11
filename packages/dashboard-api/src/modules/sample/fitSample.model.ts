import {
  ReturnModelType,
  prop as Property,
  getModelForClass,
  modelOptions,
  index,
} from "@typegoose/typegoose";
import { ObjectType } from "type-graphql";
import { Sample } from "./sample.model";

@index<FitSample>({ productCode: 1, sku: 1 }, { unique: true })
@ObjectType()
@modelOptions({ schemaOptions: { collection: "fit_samples" } })
export class FitSample extends Sample {
  //@Field({ nullable: false })
  @Property({ required: true, index: true })
  productCode!: string;

  static getFitSamplesByProductCode(
    this: ReturnModelType<typeof FitSample>,
    productCode: string,
    params: Partial<Omit<FitSample, "productCode">> = {}
  ): Promise<FitSample[]> {
    return this.find({ productCode, ...params }).exec();
  }
}

export const FitSampleModel = getModelForClass(FitSample);
