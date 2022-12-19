import {
  getModelForClass,
  prop as Property,
  ReturnModelType,
} from "@typegoose/typegoose";
import { ColorType, NoteType } from "dashboard-core";
import { Field, ObjectType } from "type-graphql";
import { ExpectResultModel } from "../common/expectResultModel";
import { IFactoryTenant } from "../factory/types";
import { Note } from "../note/note.model";
import { FabricSample } from "../sample/sample.model";

@ObjectType()
export class Fabric extends ExpectResultModel implements IFactoryTenant {
  @Field()
  id?: string;

  @Field()
  @Property({ unique: true })
  code!: string;

  @Field({ nullable: false })
  @Property()
  title!: string;

  @Field()
  @Property()
  colorName!: string;

  @Field({ nullable: true })
  @Property()
  type?: string;

  @Field({ nullable: false })
  @Property({
    get(this: Fabric): ColorType | null {
      if (this.printFileName != null) return "print";
      else return "solid";
    },
  })
  colorType?: ColorType;

  @Field()
  @Property({ required: true })
  factoryCode!: string;

  @Field({ nullable: true })
  @Property()
  colorCode?: string;

  @Field({ nullable: true })
  @Property()
  printFileName?: string;

  @Field(() => [FabricSample], { nullable: false })
  @Property({
    ref: () => FabricSample,
    foreignField: "parentCode",
    localField: "code",
  } as FabricSamplesPropParams)
  samples!: FabricSample[];

  // TODO: it depends on populate in fabrics query;
  //       it's better to run specific query and move it to resolver as fieldresolver
  //       then some loader is needed to load samples
  //       right now it's KISS until we have some issues with query performance
  @Field()
  @Property({
    get(this: Fabric): FabricStage {
      if (this.samples.some(sample => sample.approved)) return "Approved";
      else if (this.samples.length > 0) return "Fabric Sampling";
      else return "In development";
    },
  })
  stage!: string;

  @Field(() => [Note])
  @Property({
    ref: () => Note,
    foreignField: "parentId" as Partial<Note>,
    localField: "_id",
    match: { type: "fabricNote" as NoteType } as Partial<Note>,
    options: { sort: { _id: -1 } },
  })
  notes!: Note[];

  // TODO: reuse
  static async findByCodeOrFail(
    this: ReturnModelType<typeof Fabric>,
    code: string
  ): Promise<Fabric> {
    const fabric = await this.findOne({
      code,
    })
      .populate({ path: "notes", populate: { path: "user" } })
      .populate({
        path: "samples",
        populate: {
          path: "note",
          populate: {
            path: "user",
          },
        },
      })
      .exec();
    if (fabric == null) throw Error(`Fabric with given code not found`);
    return fabric;
  }
}

export const FabricModel = getModelForClass(Fabric);

type FabricSamplesPropParams = {
  localField: keyof Fabric;
  foreignField: keyof FabricSample;
};

type FabricStage = "In development" | "Fabric Sampling" | "Approved";
