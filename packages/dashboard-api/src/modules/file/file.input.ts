import { GraphQLUpload, FileUpload } from "graphql-upload";
import { Field, InputType } from "type-graphql";
import { IFileUpload } from "./file.types";

@InputType()
export class FileUploadInput implements IFileUpload {
  @Field(() => GraphQLUpload)
  file!: Promise<FileUpload>;

  @Field()
  fileSize!: number;
}
