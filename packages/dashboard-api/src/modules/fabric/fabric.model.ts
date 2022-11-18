import {
  getModelForClass,
  prop as Property,
  ReturnModelType,
} from "@typegoose/typegoose";
import { ColorType } from "dashboard-core";
import { Field, ObjectType } from "type-graphql";
import { FabricSample } from "../sample/sample.model";

@ObjectType()
export class Fabric {
  @Field()
  @Property({ unique: true })
  code!: string;

  @Field({ nullable: true })
  @Property()
  title?: string;

  @Field()
  @Property()
  colorName!: string;

  @Field({ nullable: true })
  @Property()
  type?: string;

  @Field({ nullable: true })
  @Property({
    get(this: Fabric): ColorType | null {
      if (this.printFileName != null) return "print";
      else if (this.colorCode != null) return "solid";
      return null;
    },
  })
  colorType?: ColorType;

  @Field({ nullable: true })
  @Property()
  colorCode?: string;

  @Field({ nullable: true })
  @Property()
  printFileName?: string;

  @Field(() => [FabricSample])
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

  // TODO: reuse
  static async findOneAndUpdateOrFail(
    this: ReturnModelType<typeof Fabric>,
    query: Partial<Fabric>,
    update: Partial<Fabric>
  ): Promise<Fabric> {
    const updatedFabric = await this.findOneAndUpdate(
      query,
      { $set: update },
      { returnOriginal: false }
    ).exec();
    if (updatedFabric == null) throw Error(`Fabric is not found`);
    return updatedFabric;
  }

  // TODO: reuse
  static async findByCodeOrFail(
    this: ReturnModelType<typeof Fabric>,
    code: string
  ): Promise<Fabric> {
    const fabric = await this.findOne({
      code,
    }).exec();
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
