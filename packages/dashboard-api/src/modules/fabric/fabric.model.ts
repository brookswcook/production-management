import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ColorType } from "dashboard-core";
import { Field, ObjectType } from "type-graphql";
import { FabricSample } from "../sample/fabricSample.model";

@ObjectType()
export class Fabric {
  @Field()
  @Property({ unique: true })
  code!: string;

  @Field()
  @Property()
  colorName!: string;

  @Field({ nullable: true })
  @Property()
  type?: string;

  @Field({ nullable: true })
  @Property({
    get(this: Fabric): ColorType | null {
      if (this.printUrl != null) return "print";
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
  printUrl?: string;

  @Field(() => [FabricSample])
  @Property({
    ref: () => FabricSample,
    foreignField: "fabricCode",
    localField: "code",
  } as FabricSamplesPropParams)
  samples!: FabricSample[];
}

export const FabricModel = getModelForClass(Fabric);

type FabricSamplesPropParams = {
  localField: keyof Fabric;
  foreignField: keyof FabricSample;
};
