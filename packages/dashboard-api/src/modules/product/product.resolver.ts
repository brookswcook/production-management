import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { SendSampleInput, UniqueSampleInput } from "../sample/sample.input";
import { UploadTechPackInput } from "../techPack/techPack.input";
import { CreateProductInput } from "./product.input";
import { Product, ProductModel } from "./product.model";
import { StartFabricProductionInput } from "../fabricProduction/fabricProduction.input";
import { StartProductionInput } from "../productProduction/productProduction.input";

@Resolver(Product)
export class ProductResolver {
  // TODO: consider to use lean() with getter plugin
  // TODO: populate fitSamples only when needed; analyze AST
  @Authorized()
  @Query(() => [Product])
  async products() {
    return ProductModel.find().populate("fitSamples").exec();
  }

  @Authorized()
  @Mutation(() => Product)
  async createProduct(@Arg("data") { ...data }: CreateProductInput) {
    // TODO: use workflow saved in db. Calculate it based on delivery date
    const productWorkflowData: Partial<Product> = {
      fabricProduction: {
        lastStartDate: new Date(new Date().getTime() + 14 * 8.64e7),
      },
      production: {
        lastStartDate: new Date(new Date().getTime() + 21 * 8.64e7),
      },
      qualityControl: {
        lastVisitDate: new Date(new Date().getTime() + 28 * 8.64e7),
      },
      shipping: {
        lastShippingDate: new Date(new Date().getTime() + 35 * 8.64e7),
      },
    };
    return (
      await new ProductModel({
        ...productWorkflowData,
        ...data,
      }).save()
    ).populate("fitSamples");
  }

  @Authorized()
  @Mutation(() => Product)
  async uploadTechPack(
    @Arg("data") { productName, ...data }: UploadTechPackInput
  ): Promise<Product> {
    return ProductModel.updatePerProductNameOrFail(productName, {
      techPack: data,
    });
  }

  @Authorized()
  @Mutation(() => Product)
  async sendFabricSample(
    @Arg("data") { productName, ...data }: SendSampleInput
  ): Promise<Product> {
    const product = await ProductModel.findPerProductNameOrFail(productName);
    if (product.fabricSample != null)
      throw Error("Fabric sample has been already sent!");
    product.fabricSample = data;
    return product.save();
  }

  @Authorized()
  @Mutation(() => Product)
  async markFabricSampleDelivered(
    @Arg("data") { productName }: UniqueSampleInput
  ): Promise<Product> {
    const product = await ProductModel.findPerProductNameOrFail(productName);
    if (product.fabricSample == null) throw Error("Fabric sample is not sent!");
    product.fabricSample.delivered = true;
    return product.save();
  }

  @Authorized()
  @Mutation(() => Product)
  async approveFabricSample(
    @Arg("data") { productName }: UniqueSampleInput
  ): Promise<Product> {
    const product = await ProductModel.findPerProductNameOrFail(productName);
    if (product.fabricSample == null || !product.fabricSample.delivered)
      throw Error("Fabric sample is not delivered!");
    product.fabricSample.approved = true;
    return product.save();
  }

  @Authorized()
  @Mutation(() => Product)
  async startFabricProduction(
    @Arg("data") { productName }: StartFabricProductionInput
  ): Promise<Product> {
    return ProductModel.updatePerProductNameOrFail(productName, {
      "fabricProduction.sufficientFabric": true,
      "fabricProduction.actualStartDate": new Date(),
      "fabricProduction.started": true,
    });
  }

  @Authorized()
  @Mutation(() => Product)
  async startProduction(
    @Arg("data") { productName }: StartProductionInput
  ): Promise<Product> {
    return ProductModel.updatePerProductNameOrFail(productName, {
      "production.actualStartDate": new Date(),
      "production.started": true,
    });
  }

  // @Mutation(() => Product)
  // async scheduleQCVisit(
  //   @Arg("data") { productName }: StartProductionInput
  // ): Promise<Product> {
  //   return this.updatePerProductNameOrFail(productName, {
  //     "production.actualStartDate": new Date(),
  //     "production.started": true,
  //   });
  // }
}
