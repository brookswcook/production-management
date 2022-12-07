import { FieldResolver, Resolver, Root } from "type-graphql";
import { File } from "./file.model";

@Resolver(File)
export class FileResolver {
  @FieldResolver(() => Date, { nullable: true })
  createdAt(@Root("_doc") { createdAt }: File) {
    return createdAt;
  }
}
