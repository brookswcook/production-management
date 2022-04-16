import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { uploadFile } from "../file/file.service";
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
  @Mutation(() => Fabric)
  async createFabric(@Arg("data") { print, ...data }: CreateFabricInput) {
    const fabricData: Omit<Fabric, "samples"> = data;
    if (print != null) {
      const { file, fileSize } = print;
      fabricData.printUrl = await uploadFile(
        data.code,
        "print",
        file,
        fileSize
      );
    }
    return (await new FabricModel(fabricData).save()).populate("samples");
  }

  @Authorized()
  @Mutation(() => Fabric)
  async uploadPrint(
    @Arg("data") { code, print: { file, fileSize } }: UploadPrintInput
  ): Promise<Fabric> {
    const printUrl = await uploadFile(code, "print", file, fileSize);
    return FabricModel.findOneAndUpdateOrFail({ code }, { printUrl });
  }
}
