import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { CreateStyleInput, UploadTechPackInput } from "./style.input";
import { Style, StyleModel } from "./style.model";
import { uploadFiles } from "../file/file.service";
import { UserRole } from "dashboard-core";
import { ProductService } from "../product/product.service";
import { Fabric } from "../fabric/fabric.model";
import { ResolverContext } from "../../lib/graphql";

@Resolver(Style)
export class StyleResolver {
  constructor(private readonly productService: ProductService) {
    // TODO: use DI as typedi if it gets annoying
    this.productService = new ProductService();
  }

  @FieldResolver(() => [String])
  async productCodes(
    @Root() { code }: Fabric,
    @Ctx() { user: { role } }: ResolverContext
  ): Promise<string[]> {
    // TODO: add loader to run query once
    return this.productService.getProductCodesByStyleCode(code);
  }

  @Authorized()
  @Query(() => [Style])
  async styles(): Promise<Style[]> {
    return StyleModel.find()
      .populate({ path: "techPacks", populate: "user" })
      .exec();
  }

  @Authorized()
  @Query(() => Style)
  async style(@Arg("code") code: string): Promise<Style> {
    return StyleModel.findByCodeOrFail(code);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => Style)
  async createStyle(
    @Arg("data") { code, name, techPack }: CreateStyleInput,
    @Ctx() { user: { id: userId } }: ResolverContext
  ) {
    const styleData: Partial<Style> = { code, name };
    const style = (await new StyleModel(styleData).save()) as Style;
    const { id: styleId } = style;

    if (techPack != null && techPack.length > 0) {
      await uploadFiles(styleId, userId, "tech-pack", techPack);
    }
    return style;
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => Style)
  async uploadTechPack(
    @Arg("data") { code, techPack }: UploadTechPackInput,
    @Ctx() { user: { id: userId } }: ResolverContext
  ): Promise<Style> {
    const style = await StyleModel.findByCodeOrFail(code);
    const { id: styleId } = style;
    await uploadFiles(styleId, userId, "tech-pack", techPack);
    return style;
  }
}
