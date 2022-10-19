import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { CreateStyleInput, UploadTechPackInput } from "./style.input";
import { Style, StyleModel } from "./style.model";
import { getDownloadFileLinks, uploadFiles } from "../file/file.service";
import { UserRole } from "dashboard-core";

@Resolver(Style)
export class StyleResolver {
  @Authorized()
  @Query(() => [Style])
  async styles() {
    return StyleModel.find().exec();
  }

  @Authorized()
  @Query(() => Style, { nullable: true })
  async style(@Arg("code") code: string): Promise<Style | null> {
    return StyleModel.findOne({ code }).exec();
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
