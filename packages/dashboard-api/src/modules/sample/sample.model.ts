import {
  getModelForClass,
  index,
  modelOptions,
  prop as Property,
  ReturnModelType,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Note } from "../note/note.model";

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

  @Field(() => Note, { nullable: true })
  @Property({
    ref: () => Note,
    foreignField: "parentId" as Partial<Note>,
    localField: "_id",
    match: { type: "sampleRejectionComment" } as Partial<Note>,
    options: { sort: { _id: -1 } },
    justOne: true,
  })
  note?: Note;

  static getSamplesByParentCode(
    this: ReturnModelType<typeof Sample>,
    parentCode: string,
    params: Partial<Omit<Sample, "parentCode">> = {}
  ): Promise<Sample[]> {
    return this.find({ parentCode, ...params } as Sample).exec();
  }

  static async findOneSampleAndUpdateOrFail(
    this: ReturnModelType<typeof Sample>,
    query: Partial<Sample>,
    update: Partial<Sample>
  ) {
    const updatedSample = await this.findOneAndUpdate(
      query,
      { $set: update },
      { returnOriginal: false }
    ).exec();
    if (updatedSample == null) throw Error(`Sample is not found`);
    return updatedSample;
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

  static async rejectSample(
    this: ReturnModelType<typeof Sample>,
    parentCode: string,
    sku: string
  ) {
    const sample = await this.findOneSampleAndUpdateOrFail(
      { parentCode, sku },
      { delivered: true, approved: false }
    );
    return sample;
  }

  static async approveSample(
    this: ReturnModelType<typeof Sample>,
    parentCode: string,
    sku: string
  ) {
    const sample = await this.findOneSampleAndUpdateOrFail(
      { parentCode, sku },
      { delivered: true, approved: true }
    );
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
