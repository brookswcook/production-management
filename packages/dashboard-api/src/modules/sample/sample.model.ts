import {
  getModelForClass,
  index,
  modelOptions,
  prop as Property,
  ReturnModelType,
} from "@typegoose/typegoose";
import { NoteType } from "dashboard-core";
import { Field, ObjectType } from "type-graphql";
import { Note } from "../note/note.model";

@index<Sample>({ parentCode: 1, sku: 1 }, { unique: true })
@ObjectType()
export class Sample {
  @Field()
  id?: string;

  @Property({ required: true })
  companyId!: string;

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
    match: { type: "sampleRejectionComment" as NoteType } as Partial<Note>,
    options: { sort: { _id: -1 } },
    justOne: true,
  })
  note?: Note;

  static getSamplesByParentCode(
    this: ReturnModelType<typeof Sample>,
    companyId: string,
    parentCode: string,
    params: Partial<Omit<Sample, "parentCode">> = {}
  ): Promise<Sample[]> {
    return this.find({ companyId, parentCode, ...params } as Sample).exec();
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
      data.companyId,
      data.parentCode,
      {
        delivered: false,
      }
    );
    if (unapprovedSample.length > 0)
      throw new Error("There is already sent and not delivered sample!");
    return new this(data).save();
  }

  static async markAsDelivered(
    this: ReturnModelType<typeof Sample>,
    companyId: string,
    parentCode: string,
    sku: string
  ) {
    const sample = await this.findOneSampleAndUpdateOrFail(
      { companyId, parentCode, sku },
      { delivered: true }
    );
    return sample;
  }

  static async rejectSample(
    this: ReturnModelType<typeof Sample>,
    companyId: string,
    parentCode: string,
    sku: string
  ) {
    const sample = await this.findOneSampleAndUpdateOrFail(
      { companyId, parentCode, sku },
      { approved: false }
    );
    return sample;
  }

  static async approveSample(
    this: ReturnModelType<typeof Sample>,
    companyId: string,
    parentCode: string,
    sku: string
  ) {
    const sample = await this.findOneSampleAndUpdateOrFail(
      { companyId, parentCode, sku },
      { approved: true }
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
