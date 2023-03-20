import {
  Arg,
  Authorized,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { CreateProductInput, UpdateProductionCostInput } from "./product.input";
import { Product, ProductModel } from "./product.model";
import { StartFabricProductionInput } from "../fabricProduction/fabricProduction.input";
import { StartProductionInput } from "../productProduction/productProduction.input";
import { UserRole } from "dashboard-core";
import { TenantId } from "../user/user.decorator";
import { UserActionLog } from "../../lib/userActionLogMiddleware";

@Resolver(Product)
export class ProductResolver {
  // TODO: populate fitSamples only when needed; analyze AST
  // maybe it's possible to get populate data from reflect metadata
  @Authorized()
  @Query(() => [Product])
  async products(@TenantId() companyId: string) {
    return ProductModel.find({ companyId })
      .sort({ _id: -1 })
      .populate({ path: "notes", populate: { path: "user" } })
      .populate("fitSamples")
      .populate({ path: "style", populate: { path: "techPacks" } })
      .populate({
        path: "fabric",
        populate: { path: "samples" },
      })
      .populate("factory")
      .exec();
  }

  @Authorized()
  @Query(() => Product)
  async product(
    @TenantId() companyId: string,
    @Arg("code", { nullable: false }) code: string
  ) {
    return ProductModel.findOneOrFail({ code, companyId }, [
      { path: "notes", populate: { path: "user" } },
      { path: "fitSamples", populate: { path: "note" } },
      { path: "style", populate: { path: "techPacks" } },
      {
        path: "fabric",
        populate: {
          path: "samples",
          populate: {
            path: "note",
          },
        },
      },
      { path: "factory" },
    ]);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => Product)
  @UseMiddleware(UserActionLog<Product>("Product is created"))
  async createProduct(
    @Arg("data") data: CreateProductInput,
    @TenantId() companyId: string
  ) {
    // TODO: use workflow saved in db. Calculate it based on delivery date
    const productWorkflowData: Partial<Product> = {
      fabricProduction: {
        lastStartDate: new Date(new Date().getTime() + 14 * 8.64e7),
      },
      production: {
        lastStartDate: new Date(new Date().getTime() + 21 * 8.64e7),
        cost: 0,
        bulkProductionCostDiscounts: [],
      },
      qualityControl: {
        lastVisitDate: new Date(new Date().getTime() + 28 * 8.64e7),
      },
      shipping: {
        lastShippingDate: new Date(new Date().getTime() + 35 * 8.64e7),
      },
    };
    return new ProductModel({
      companyId,
      ...productWorkflowData,
      ...data,
    }).save();
  }

  @Authorized(["Admin", "VChapman", "Factory"] as UserRole[])
  @Mutation(() => Product)
  @UseMiddleware(UserActionLog<Product>("Production cost is updated"))
  async updateCost(
    @Arg("data") { code, productionCost }: UpdateProductionCostInput,
    @TenantId() companyId: string
  ): Promise<Product> {
    return ProductModel.findOneAndUpdateOrFail<Product>(
      { companyId, code },
      { "production.cost": productionCost }
    );
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => Product)
  @UseMiddleware(UserActionLog<Product>("Product fabric production is started"))
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
  @UseMiddleware(UserActionLog<Product>("Product production is started"))
  async startProduction(
    @Arg("data") { productName }: StartProductionInput
  ): Promise<Product> {
    return ProductModel.updatePerProductNameOrFail(productName, {
      "production.actualStartDate": new Date(),
      "production.started": true,
    });
  }
}
