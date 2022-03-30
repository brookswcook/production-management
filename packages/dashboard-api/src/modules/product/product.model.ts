import {
  getModelForClass,
  index,
  prop as Property,
  Ref,
} from "@typegoose/typegoose";
import { Field, Int, ObjectType } from "type-graphql";
import { FitSample } from "../sample/fitSample.model";
import { Sample } from "../sample/sample.model";
import { TechPack } from "../techPack/techPack.model";
import { FabricProduction } from "../fabricProduction/fabricProduction.model";
import { ProductProduction } from "../productProduction/productProduction.model";
import { ProductQualityControl } from "../productQualityControl/productQualityControl.model";
import { ProductShipping } from "../productShipping/productShipping.model";

@index({ model: 1, style: 1, sku: 1 }, { unique: true })
@ObjectType()
export class Product {
  @Field()
  @Property({
    default(this: Product) {
      return `${this.model}-${this.style}-${this.sku}`;
    },
  })
  name!: string;

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
        (this.deliveryDate.getTime() - new Date().getTime()) / 8.64e7
      );
    },
  })
  dueIn!: number;

  // TODO: add QC and Shipping stages
  @Field()
  @Property({
    get(this: Product) {
      return (
        (this.fabricProduction?.onTime || this.production?.onTime) &&
        this.dueIn > 0
      );
    },
  })
  onTime?: boolean;

  @Field()
  @Property({
    get(this: Product) {
      return this.techPack != null;
    },
  })
  techPackUploaded?: boolean;

  stage?: string;
  awaitingFabricSample?: boolean;
  awaitingFitSample?: boolean;
  gradingUploaded?: boolean;

  @Field(() => TechPack, { nullable: true })
  @Property({ _id: false })
  techPack?: TechPack;

  @Field(() => Sample, { nullable: true })
  @Property({ _id: false })
  fabricSample?: Sample;

  // Note: might be useful to get it as part of product by populate, see also getFitSamplesByProductName
  @Property({
    ref: () => FitSample,
    foreignField: "productName",
    localField: "name",
  })
  fitSamples!: Ref<FitSample>[];

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
