import { GraphQLUpload, FileUpload } from "graphql-upload";
import { Field, InputType } from "type-graphql";

@InputType()
export class FileUploadInput {
  @Field(() => GraphQLUpload)
  file!: Promise<FileUpload>;

  @Field()
  fileSize!: number;
}
