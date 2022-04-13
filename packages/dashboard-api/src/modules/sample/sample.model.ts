import {
  getModelForClass,
  index,
  modelOptions,
  prop as Property,
  ReturnModelType,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@index<Sample>({ parentCode: 1, sku: 1 }, { unique: true })
@ObjectType()
export class Sample {
  @Field()
  @Property({ required: true, index: true })
  parentCode!: string;

  @Field()
  @Property()
  sku!: string;

  @Field({ nullable: true })
  @Property({ default: false })
  approved?: boolean;

  @Field()
  @Property()
  trackNumber!: string;

  @Field({ nullable: true })
  @Property({ default: false })
  delivered?: boolean;

  static getSamplesByParentCode(
    this: ReturnModelType<
      typeof Sample | typeof FitSample | typeof FabricSample
    >,
    parentCode: string,
    params: Partial<Omit<Sample, "parentCode">> = {}
  ): Promise<Sample[]> {
    return this.find({ parentCode, ...params } as Sample).exec();
  }

  static async sendSample(this: ReturnModelType<typeof Sample>, data: Sample) {
    const unapprovedSample = await this.getSamplesByParentCode(
      data.parentCode,
      {
        delivered: false,
      }
    );
    if (unapprovedSample.length > 0)
      throw new Error("There is already sent and not delivered sample!");
    return new this(data).save();
  }

  static async approveSample(
    this: ReturnModelType<typeof Sample>,
    parentCode: string,
    sku: string
  ) {
    const sample = await this.findOneAndUpdate(
      {
        parentCode,
        sku,
      } as Sample,
      { $set: { delivered: true, approved: true } as Partial<Sample> },
      { returnOriginal: false }
    ).exec();
    if (sample == null) throw Error(`Sample is not found`);
    return sample;
  }
}

@ObjectType()
@modelOptions({ schemaOptions: { collection: "fit_samples" } })
export class FitSample extends Sample {}
export const FitSampleModel = getModelForClass(FitSample);

@ObjectType()
@modelOptions({ schemaOptions: { collection: "fabric_samples" } })
export class FabricSample extends Sample {}
export const FabricSampleModel = getModelForClass(FabricSample);
