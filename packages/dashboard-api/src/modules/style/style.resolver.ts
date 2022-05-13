import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { CreateStyleInput, UploadTechPackInput } from "./style.input";
import { Style, StyleModel } from "./style.model";
import { getDownloadFileLink, uploadFile } from "../file/file.service";
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
  @Query(() => String)
  async techPackLink(@Arg("fileName") fileName: string): Promise<string> {
    return getDownloadFileLink(fileName);
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => Style)
  async createStyle(@Arg("data") { code, name, techPack }: CreateStyleInput) {
    const styleData: Style = { code, name };
    if (techPack != null) {
      const { file, fileSize } = techPack;
      styleData.techPackFileName = await uploadFile(
        code,
        "tech-pack",
        file,
        fileSize
      );
    }
    return await new StyleModel(styleData).save();
  }

  @Authorized(["Admin", "VChapman"] as UserRole[])
  @Mutation(() => Style)
  async uploadTechPack(
    @Arg("data") { code, techPack: { file, fileSize } }: UploadTechPackInput
  ): Promise<Style> {
    const techPackFileName = await uploadFile(
      code,
      "tech-pack",
      file,
      fileSize
    );
    return StyleModel.findOneAndUpdateOrFail({ code }, { techPackFileName });
  }
}
