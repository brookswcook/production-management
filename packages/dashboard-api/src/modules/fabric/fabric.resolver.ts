import { UserRole } from "dashboard-core";
import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getDownloadFileLink, uploadFile } from "../file/file.service";
import { ProductService } from "../product/product.service";
import { CreateFabricInput, UploadPrintInput } from "./fabric.input";
import { Fabric, FabricModel } from "./fabric.model";

@Resolver(() => Fabric)
export class FabricResolver {
  constructor(private readonly productService: ProductService) {
    // TODO: use DI as typedi if it gets annoying
    this.productService = new ProductService();
  }

  @FieldResolver(() => [String])
  async productCodes(@Root("_doc") { code }: Fabric): Promise<string[]> {
    // TODO: add loader to run query once
    return this.productService.getProductCodesByFabricCode(code);
  }

  @Authorized()
  @Query(() => [Fabric])
  async fabrics() {
    return FabricModel.find()
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
  async fabric(@Arg("code") code: string): Promise<Fabric | null> {
    return FabricModel.findByCodeOrFail(code);
  }

  @Authorized()
  @Query(() => String)
  async printLink(@Arg("fileName") fileName: string): Promise<string> {
    return getDownloadFileLink(fileName);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => Fabric)
  async createFabric(@Arg("data") { print, ...data }: CreateFabricInput) {
    const fabricData: Omit<
      Fabric,
      "samples" | "stage" | "products" | "factoryName" | "notes"
    > = data;
    if (print != null) {
      const { file, fileSize } = print;
      fabricData.printFileName = await uploadFile(
        data.code,
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
    @Arg("data") { code, print: { file, fileSize } }: UploadPrintInput
  ): Promise<Fabric> {
    const printFileName = await uploadFile(code, "print", file, fileSize);
    return FabricModel.findOneAndUpdateOrFail({ code }, { printFileName });
  }
}
