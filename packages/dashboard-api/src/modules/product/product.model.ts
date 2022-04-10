import {
  getModelForClass,
  index,
  prop as Property,
} from "@typegoose/typegoose";
import { Field, Int, ObjectType } from "type-graphql";
import { FitSample } from "../sample/fitSample.model";
import { FabricProduction } from "../fabricProduction/fabricProduction.model";
import { ProductProduction } from "../productProduction/productProduction.model";
import { ProductQualityControl } from "../productQualityControl/productQualityControl.model";
import { ProductShipping } from "../productShipping/productShipping.model";
import { Style } from "../style/style.model";
import { Fabric } from "../fabric/fabric.model";

@index<Product>({ styleCode: 1, fabricCode: 1 }, { unique: true })
@ObjectType()
export class Product {
  @Field()
  @Property({
    default(this: Product) {
      return `${this.styleCode}-${this.fabricCode}`;
    },
    unique: true,
  })
  code!: string;

  @Field()
  @Property({
    get(this: Product) {
      return `${this.style.name} in ${this.fabric.colorName}`;
    },
  })
  name!: string;

  @Field()
  @Property({ required: true })
  styleCode!: string;

  @Field()
  @Property({ required: true })
  fabricCode!: string;

  @Field()
  @Property({
    ref: () => Style,
    foreignField: "code",
    localField: "styleCode",
    justOne: true,
  } as StylePropParams)
  style!: Style;

  @Field()
  @Property({
    ref: () => Fabric,
    foreignField: "code",
    localField: "fabricCode",
    justOne: true,
  } as FabricPropParams)
  fabric!: Fabric;

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
      return this.style.techPackUploaded;
    },
  })
  techPackUploaded?: boolean;

  @Field()
  @Property({
    get(this: Product): ProductStage {
      if (this.production?.started) return "Production";
      else if (this.fabricProduction?.started) return "Pre-Cut & Sew";
      else if (this.fitSamples.length > 0) return "Fit Sampling";
      else if (this.fabric.samples.length > 0) return "Fabric Sampling";
      else if (this.techPackUploaded) return "Pre-Sampling";
      else return "Planning";
    },
  })
  stage?: string;

  @Field()
  @Property({
    get(this: Product) {
      return this.fabric.samples.some(sample => sample.delivered);
    },
  })
  fabricSampleDelivered?: boolean;

  @Field()
  @Property({
    get(this: Product) {
      return this.fitSamples.some(fitSample => fitSample.delivered);
    },
  })
  fitSampleDelivered?: boolean;

  // Note: might be useful to get it as part of product by populate, see also getFitSamplesByProductName
  @Field(() => [FitSample])
  @Property({
    ref: () => FitSample,
    foreignField: "productName",
    localField: "name",
  } as FitSamplePropParams)
  fitSamples!: FitSample[];

  @Field(() => FitSample, { nullable: true })
  @Property({
    get(this: Product) {
      return this.fitSamples.find(sample => sample.approved);
    },
  })
  preProductionSample?: FitSample;

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

  static async findPerProductCodeOrFail(code: string) {
    const product = await ProductModel.findOne({
      code,
    } as Product)
      .populate("fitSamples")
      .populate("style")
      .populate({
        path: "fabric",
        populate: { path: "samples" },
      })
      .exec();
    if (product == null) throw Error(`Product with given code not found`);
    return product;
  }

  static async updatePerProductNameOrFail(
    productName: string,
    data: Partial<Product> | { [key: string]: unknown }
  ): Promise<Product> {
    const product = await ProductModel.findOneAndUpdate(
      {
        name: productName,
      } as Product,
      { $set: data },
      { returnOriginal: false }
    ).exec();
    if (product == null) throw Error(`Product with given title not found`);
    return product;
  }
}

export const ProductModel = getModelForClass(Product);

type FabricPropParams = {
  localField: keyof Product;
  foreignField: keyof Fabric;
};

type StylePropParams = {
  localField: keyof Product;
  foreignField: keyof Style;
};

type FitSamplePropParams = {
  localField: keyof Product;
  foreignField: keyof FitSample;
};

type ProductStage =
  | "Production"
  | "Pre-Cut & Sew"
  | "Fit Sampling"
  | "Fabric Sampling"
  | "Pre-Sampling"
  | "Planning";
