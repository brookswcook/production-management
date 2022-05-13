import { UserRole } from "dashboard-core";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { getDownloadFileLink, uploadFile } from "../file/file.service";
import { CreateFabricInput, UploadPrintInput } from "./fabric.input";
import { Fabric, FabricModel } from "./fabric.model";

@Resolver(Fabric)
export class FabricResolver {
  @Authorized()
  @Query(() => [Fabric])
  async fabrics() {
    return FabricModel.find().populate("samples").exec();
  }

  @Authorized()
  @Query(() => Fabric, { nullable: true })
  async fabric(@Arg("code") code: string): Promise<Fabric | null> {
    return FabricModel.findOne({ code }).exec();
  }

  @Authorized()
  @Query(() => String)
  async printLink(@Arg("fileName") fileName: string): Promise<string> {
    return getDownloadFileLink(fileName);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => Fabric)
  async createFabric(@Arg("data") { print, ...data }: CreateFabricInput) {
    const fabricData: Omit<Fabric, "samples"> = data;
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
