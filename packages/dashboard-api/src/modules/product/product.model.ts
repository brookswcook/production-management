import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { Field, Int, ObjectType } from "type-graphql";
import { Sample } from "../sample/sample.model";
import { TechPack } from "../techPack/techPack.model";
import { FabricProduction } from "./fabricProduction.model";
import { ProductProduction } from "./production.model";
import { ProductQualityControl } from "./qualityControl.model";
import { ProductShipping } from "./shipping.model";

@ObjectType()
export class Product {
  @Field()
  @Property({
    default(this: Product) {
      return `${this.model}-${this.style}-${this.sku}`;
    },
  })
  title?: string;

  @Field()
  @Property({ required: true })
  model!: string;

  @Field()
  @Property({ required: true })
  style!: string;

  @Field()
  @Property({ required: true })
  sku!: string;

  @Field()
  @Property({ required: true })
  deliveryDate!: Date;

  @Field(() => Int)
  @Property({
    get(this: Product) {
      return Math.floor(
        (new Date().getTime() - this.deliveryDate.getTime()) / 8.64e7
      );
    },
  })
  dueIn?: number;

  stage?: string;
  onTime?: boolean;
  techPackUploaded?: boolean;
  awaitingFabricSample?: boolean;
  awaitingFitSample?: boolean;
  gradingUploaded?: boolean;

  @Field(() => TechPack, { nullable: true })
  @Property({ _id: false })
  techPack?: TechPack;

  @Field(() => Sample, { nullable: true })
  @Property({ _id: false })
  fabricSample?: Sample;

  @Field(() => [Sample], { nullable: true })
  @Property({ _id: false, type: () => Sample })
  fitSamples?: Sample[];

  @Field(() => Sample, { nullable: true })
  @Property({
    get(this: Product) {
      if (this.fitSamples == null) return null;
      return this.fitSamples.find((fitSample) => fitSample.approved);
    },
  })
  preProductionSample?: Sample;

  @Field(() => FabricProduction, { nullable: true })
  @Property({ _id: false })
  fabricProduction?: FabricProduction;

  @Field(() => ProductProduction, { nullable: true })
  @Property({ _id: false })
  production?: ProductProduction;

  @Field(() => ProductQualityControl, { nullable: true })
  @Property({ _id: false })
  qualityControl?: ProductQualityControl;

  @Field(() => ProductShipping, { nullable: true })
  @Property({ _id: false })
  shipping?: ProductShipping;
}

export const ProductModel = getModelForClass(Product);
