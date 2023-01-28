import { Ctx, Query, Resolver } from "type-graphql";
import { ResolverContext } from "../../lib/graphql";
import {
  ProductAttribute,
  ProductAttributeModel,
} from "./productAttribute.model";

@Resolver(ProductAttribute)
export class ProductAttributeResolver {
  @Query(() => [ProductAttribute])
  async productAttributes(
    @Ctx() { user: { companyId } }: ResolverContext
  ): Promise<ProductAttribute[]> {
    return ProductAttributeModel.find({ companyId }).exec();
  }
}
