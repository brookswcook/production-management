import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { CreateStyleInput, UploadTechPackInput } from "./style.input";
import { Style, StyleModel } from "./style.model";
import { uploadFiles } from "../file/file.service";
import { UserRole } from "dashboard-core";
import { ProductService } from "../product/product.service";
import { Fabric } from "../fabric/fabric.model";
import { ResolverContext } from "../../lib/graphql";
import { TenantId } from "../user/user.decorator";
import { Service } from "typedi";

@Service()
@Resolver(Style)
export class StyleResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly notificationSubscriptionService: NotificationSubscriptionService
  ) {}

  @FieldResolver(() => [String])
  async productCodes(@Root() { code }: Fabric): Promise<string[]> {
    // TODO: add loader to run query once
    return this.productService.getProductCodesByStyleCode(code);
  }

  @Authorized()
  @Query(() => [Style])
  async styles(@TenantId() companyId: string): Promise<Style[]> {
    return StyleModel.find({ companyId })
      .populate({ path: "techPacks", populate: "user" })
      .exec();
  }

  @Authorized()
  @Query(() => Style)
  async style(
    @TenantId() companyId: string,
    @Arg("code") code: string
  ): Promise<Style> {
    return StyleModel.findOneOrFail(
      { code, companyId },
      { path: "techPacks", populate: "user" }
    );
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => Style)
  @UseMiddleware(UserActionLog<Style>("Style is created"))
  async createStyle(
    @TenantId() companyId: string,
    @Arg("data") { code, name, techPack }: CreateStyleInput,
    @Ctx() { user: { id: userId } }: ResolverContext
  ) {
    const styleData: Partial<Style> = { code, name };
    const style = (await new StyleModel({
      companyId,
      ...styleData,
    }).save()) as Style;
    const { id: styleId } = style;

    if (techPack != null && techPack.length > 0) {
      await uploadFiles(styleId, userId, "tech-pack", techPack);
    }
    return style;
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => Style)
  @UseMiddleware(UserActionLog<Style>("New tech pack is uploaded"))
  async uploadTechPack(
    @TenantId() companyId: string,
    @Arg("data") { code, techPack }: UploadTechPackInput,
    @Ctx() { user: { id: userId } }: ResolverContext
  ): Promise<Style> {
    const style = await StyleModel.findOneOrFail(
      { code, companyId },
      { path: "techPacks", populate: "user" }
    );
    const styleId = String(style.id);
    await uploadFiles(styleId, userId, "tech-pack", techPack);
    return style;
  }
}
