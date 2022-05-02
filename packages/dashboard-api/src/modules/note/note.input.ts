import { Field, InputType } from "type-graphql";
import { FileUploadInput } from "../file/file.input";

@InputType()
export class CreateNoteInput {
  @Field()
  parentId!: string;

  @Field()
  text!: string;

  @Field(() => [FileUploadInput], { nullable: true, defaultValue: [] })
  images!: FileUploadInput[];

  @Field()
  type!: "sampleRejectionComment" | "productNote";
}
