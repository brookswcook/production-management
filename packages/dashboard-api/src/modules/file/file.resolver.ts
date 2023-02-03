import { Authorized, FieldResolver, Resolver, Root } from "type-graphql";
import { File } from "./file.model";
import { getDownloadFileLink } from "./file.service";

@Resolver(File)
export class FileResolver {
  @FieldResolver(() => Date, { nullable: true })
  createdAt(@Root() { createdAt }: File) {
    return createdAt;
  }

  @Authorized()
  @FieldResolver(() => String)
  link(@Root() { uploadingKey }: File): Promise<string> {
    return getDownloadFileLink(uploadingKey);
  }
}
