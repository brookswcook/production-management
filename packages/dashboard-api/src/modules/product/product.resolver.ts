import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UploadTechPackInput } from "../techPack/techPack.input";
import { CreateProductInput } from "./product.input";
import { Product, ProductModel } from "./product.model";

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  async products() {
    return ProductModel.find().exec();
  }

  @Mutation(() => Product)
  async createProduct(@Arg("data") { ...data }: CreateProductInput) {
    return new ProductModel(data).save();
  }

  @Mutation(() => Product)
  async uploadTechPack(
    @Arg("data") { productTitle, ...data }: UploadTechPackInput
  ): Promise<Product> {
    const product = await ProductModel.findOneAndUpdate<Product>(
      {
        title: productTitle,
      },
      { techPack: data },
      { returnOriginal: false }
    ).exec();
    if (product == null) throw Error(`Product with given title not found`);
    return product;
  }
}
