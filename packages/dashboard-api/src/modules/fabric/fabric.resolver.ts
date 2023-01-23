import { UserRole } from "dashboard-core";
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
import { ResolverContext } from "../../lib/graphql";
import { getDownloadFileLink, uploadFile } from "../file/file.service";
import { ProductService } from "../product/product.service";
import { UserService } from "../user/user.service";
import { CreateFabricInput, UploadPrintInput } from "./fabric.input";
import { Fabric, FabricModel } from "./fabric.model";

@Resolver(() => Fabric)
export class FabricResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService
  ) {
    // TODO: use DI as typedi if it gets annoying
    this.productService = new ProductService();
    this.userService = new UserService();
  }

  @FieldResolver(() => [String])
  async productCodes(
    @Root() { code }: Fabric,
    @Ctx() { user: { role } }: ResolverContext
  ): Promise<string[]> {
    const factoryCode = this.userService.parseFactoryCodeRole(role);
    // TODO: add loader to run query once
    return this.productService.getProductCodesByFabricCode(code, factoryCode);
  }

  @Authorized()
  @Query(() => [Fabric])
  async fabrics(@Ctx() { user: { role } }: ResolverContext) {
    const factoryCode = this.userService.parseFactoryCodeRole(role);
    const query: Partial<Fabric> = {};
    factoryCode && Object.assign(query, { factoryCode });
    return FabricModel.find(query)
      .populate({
        path: "samples",
        populate: {
          path: "note",
        },
      })
      .populate({ path: "notes", populate: { path: "user" } })
      .exec();
  }

  @Authorized()
  @Query(() => Fabric, { nullable: false })
  async fabric(
    @Arg("code") code: string,
    @Ctx() { user: { role } }: ResolverContext
  ): Promise<Fabric | null> {
    const factoryCode = this.userService.parseFactoryCodeRole(role);
    return FabricModel.findByCodeOrFail(code, factoryCode);
  }

  @Authorized()
  @Query(() => String)
  async printLink(@Arg("fileName") fileName: string): Promise<string> {
    return getDownloadFileLink(fileName);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => Fabric)
  async createFabric(
    @Arg("data") { print, ...data }: CreateFabricInput,
    @Ctx() { user: { id: userId } }: ResolverContext
  ) {
    const fabricData: Omit<
      Fabric,
      "samples" | "stage" | "products" | "factoryCode" | "notes"
    > = data;
    if (print != null) {
      const { file, fileSize } = print;
      fabricData.printFileName = await uploadFile(
        data.code,
        userId,
        "print",
        file,
        fileSize
      );
    }
    return (await new FabricModel(fabricData).save()).populate("samples");
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => Fabric)
  async uploadPrint(
    @Arg("data") { code, print: { file, fileSize } }: UploadPrintInput,
    @Ctx() { user: { id: userId } }: ResolverContext
  ): Promise<Fabric> {
    const printFileName = await uploadFile(
      code,
      userId,
      "print",
      file,
      fileSize
    );
    return FabricModel.findOneAndUpdateOrFail({ code }, { printFileName });
  }
}
