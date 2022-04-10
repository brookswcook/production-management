import {
  ReturnModelType,
  prop as Property,
  getModelForClass,
  modelOptions,
  index,
} from "@typegoose/typegoose";
import { ObjectType } from "type-graphql";
import { Sample } from "./sample.model";

@index<FabricSample>({ fabricCode: 1, sku: 1 }, { unique: true })
@ObjectType()
@modelOptions({ schemaOptions: { collection: "fabric_samples" } })
export class FabricSample extends Sample {
  @Property({ required: true, index: true })
  fabricCode!: string;

  static getFabricSamplesByProductName(
    this: ReturnModelType<typeof FabricSample>,
    fabricCode: string,
    params: Partial<Omit<FabricSample, "fabricCode">> = {}
  ): Promise<FabricSample[]> {
    return this.find({
      fabricCode,
      ...params,
    } as Partial<FabricSample>).exec();
  }
}

export const FabricSampleModel = getModelForClass(FabricSample);
