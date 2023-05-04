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
  UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import { ResolverContext } from "../../lib/graphql";
import { UserActionLog } from "../../lib/userActionLogMiddleware";
import { getDownloadFileLink, uploadFile } from "../file/file.service";
import { ProductService } from "../product/product.service";
import { TenantId } from "../user/user.decorator";
import { CreateFabricInput, UploadPrintInput } from "./fabric.input";
import { Fabric, FabricModel } from "./fabric.model";

@Service()
@Resolver(() => Fabric)
export class FabricResolver {
  constructor(private readonly productService: ProductService) {}

  @FieldResolver(() => [String])
  async productCodes(@Root() { code }: Fabric): Promise<string[]> {
    // TODO: add loader to run query once
    return this.productService.getProductCodesByFabricCode(code);
  }

  @Authorized()
  @Query(() => [Fabric])
  async fabrics(@TenantId() companyId: string) {
    return FabricModel.find({ companyId })
      .populate({
        path: "samples",
        populate: {
          path: "note",
        },
      })
      .populate({ path: "notes", populate: { path: "user" } })
      .populate("factory")
      .exec();
  }

  @Authorized()
  @Query(() => Fabric, { nullable: false })
  async fabric(
    @TenantId() companyId: string,
    @Arg("code") code: string
  ): Promise<Fabric> {
    return FabricModel.findOneOrFail({ companyId, code }, [
      { path: "notes", populate: { path: "user" } },
      {
        path: "samples",
        populate: { path: "note", populate: { path: "user" } },
      },
      { path: "factory" },
    ]);
  }

  @Authorized()
  @Query(() => String)
  async printLink(@Arg("fileName") fileName: string): Promise<string> {
    return getDownloadFileLink(fileName);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => Fabric)
  @UseMiddleware(UserActionLog<Fabric>("Fabric is created"))
  async createFabric(
    @TenantId() companyId: string,
    @Arg("data") { print, ...data }: CreateFabricInput,
    @Ctx() { user: { id: userId } }: ResolverContext
  ) {
    const fabricData: Omit<
      Fabric,
      | "samples"
      | "stage"
      | "products"
      | "factory"
      | "notes"
      | "companyId"
      | "company"
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
    return (
      await new FabricModel({ companyId, ...fabricData }).save()
    ).populate("samples");
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => Fabric)
  @UseMiddleware(UserActionLog<Fabric>("Print is uploaded"))
  async uploadPrint(
    @TenantId() companyId: string,
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
    return FabricModel.findOneAndUpdateOrFail(
      { companyId, code },
      { printFileName }
    );
  }
}
