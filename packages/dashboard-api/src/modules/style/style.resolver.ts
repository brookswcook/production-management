import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { CreateStyleInput, UploadTechPackInput } from "./style.input";
import { Style, StyleModel } from "./style.model";
import { getDownloadFileLinks, uploadFiles } from "../file/file.service";
import { UserRole } from "dashboard-core";
import { ProductService } from "../product/product.service";
import { Fabric } from "../fabric/fabric.model";

@Resolver(Style)
export class StyleResolver {
  constructor(private readonly productService: ProductService) {
    // TODO: use DI as typedi if it gets annoying
    this.productService = new ProductService();
  }

  @FieldResolver(() => [String])
  async productCodes(@Root("_doc") { code }: Fabric): Promise<string[]> {
    // TODO: add loader to run query once
    return this.productService.getProductCodesByStyleCode(code);
  }

  @Authorized()
  @Query(() => [Style])
  async styles() {
    return StyleModel.find().exec();
  }

  @Authorized()
  @Query(() => Style)
  async style(@Arg("code") code: string): Promise<Style> {
    return StyleModel.findByCodeOrFail(code);
  }

  @Authorized()
  @Query(() => [String])
  async techPackLinks(
    @Arg("fileNames", () => [String]) fileNames: string[]
  ): Promise<string[]> {
    return getDownloadFileLinks(fileNames);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => Style)
  async createStyle(@Arg("data") { code, name, techPack }: CreateStyleInput) {
    const styleData: Style = { code, name };
    if (techPack != null && techPack.length > 0) {
      styleData.techPackFileNames = await uploadFiles(
        code,
        "tech-pack",
        techPack
      );
    }
    return await new StyleModel(styleData).save();
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => Style)
  async uploadTechPack(
    @Arg("data") { code, techPack }: UploadTechPackInput
  ): Promise<Style> {
    const techPackFileNames = await uploadFiles(code, "tech-pack", techPack);
    return StyleModel.findOneAndUpdateOrFail({ code }, { techPackFileNames });
  }
}
