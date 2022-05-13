import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { CreateProductInput } from "./product.input";
import { Product, ProductModel } from "./product.model";
import { StartFabricProductionInput } from "../fabricProduction/fabricProduction.input";
import { StartProductionInput } from "../productProduction/productProduction.input";
import { UserRole } from "dashboard-core";

@Resolver(Product)
export class ProductResolver {
  // TODO: consider to use lean() with getter plugin
  // TODO: populate fitSamples only when needed; analyze AST
  @Authorized()
  @Query(() => [Product])
  async products() {
    return ProductModel.find()
      .sort({ _id: -1 })
      .populate({ path: "notes", populate: { path: "user" } })
      .populate("fitSamples")
      .populate("style")
      .populate({
        path: "fabric",
        populate: { path: "samples" },
      })
      .exec();
  }

  @Authorized()
  @Query(() => Product)
  async product(@Arg("code", { nullable: false }) code: string) {
    return ProductModel.findPerProductCodeOrFail(code);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => Product)
  async createProduct(@Arg("data") data: CreateProductInput) {
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
    return new ProductModel({
      ...productWorkflowData,
      ...data,
    }).save();
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
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

  @Authorized(["Admin", "VChapman"] as UserRole[])
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
