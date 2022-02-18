import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { SendSampleInput, UniqueSampleInput } from "../sample/sample.input";
import { UploadTechPackInput } from "../techPack/techPack.input";
import { CreateProductInput } from "./product.input";
import { Product, ProductModel } from "./product.model";
import { FitSample, FitSampleModel } from "../sample/fitSample.model";
import { DocumentType } from "@typegoose/typegoose";

@Resolver(Product)
export class ProductResolver {
  @FieldResolver(() => [FitSample])
  fitSamples(@Root() product: DocumentType<Product>): Promise<FitSample[]> {
    return FitSampleModel.getFitSamplesByProductName(product.toObject().name);
  }

  // TODO: use loader to avoid redundant db calls
  @FieldResolver(() => FitSample, { nullable: true })
  async preProductionSample(
    @Root() product: DocumentType<Product>
  ): Promise<FitSample | null> {
    const approvedFitSamples = await FitSampleModel.getFitSamplesByProductName(
      product.toObject().name,
      { approved: true }
    );
    return approvedFitSamples.pop() || null;
  }

  // TODO: consider to use lean() with getter plugin
  @Query(() => [Product])
  products() {
    return ProductModel.find().exec();
  }

  @Mutation(() => Product)
  async createProduct(@Arg("data") { ...data }: CreateProductInput) {
    return new ProductModel(data).save();
  }

  @Mutation(() => Product)
  async uploadTechPack(
    @Arg("data") { productName, ...data }: UploadTechPackInput
  ): Promise<Product> {
    return this.updatePerProductNameOrFail(productName, { techPack: data });
  }

  @Mutation(() => Product)
  async sendFabricSample(
    @Arg("data") { productName, ...data }: SendSampleInput
  ): Promise<Product> {
    const product = await this.findPerProductNameOrFail(productName);
    if (product.fabricSample != null)
      throw Error("Fabric sample has been already sent!");
    product.fabricSample = data;
    return product.save();
  }

  @Mutation(() => Product)
  async markFabricSampleDelivered(
    @Arg("data") { productName }: UniqueSampleInput
  ): Promise<Product> {
    const product = await this.findPerProductNameOrFail(productName);
    if (product.fabricSample == null) throw Error("Fabric sample is not sent!");
    product.fabricSample.delivered = true;
    return product.save();
  }

  @Mutation(() => Product)
  async approveFabricSample(
    @Arg("data") { productName }: UniqueSampleInput
  ): Promise<Product> {
    const product = await this.findPerProductNameOrFail(productName);
    if (product.fabricSample == null || !product.fabricSample.delivered)
      throw Error("Fabric sample is not delivered!");
    product.fabricSample.approved = true;
    return product.save();
  }

  private async findPerProductNameOrFail(
    productName: string,
    populatePath = ""
  ) {
    const product = await ProductModel.findOne({
      title: productName,
    })
      .populate(populatePath)
      .exec();
    if (product == null) throw Error(`Product with given title not found`);
    return product;
  }

  private async updatePerProductNameOrFail(
    productName: string,
    data: Partial<Product>
  ): Promise<Product> {
    const product = await ProductModel.findOneAndUpdate<Product>(
      {
        title: productName,
      },
      { ...data },
      { returnOriginal: false }
    ).exec();
    if (product == null) throw Error(`Product with given title not found`);
    return product;
  }
}
