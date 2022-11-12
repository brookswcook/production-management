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
}

export const FabricModel = getModelForClass(Fabric);

type FabricSamplesPropParams = {
  localField: keyof Fabric;
  foreignField: keyof FabricSample;
};
