import { Field, InputType } from "type-graphql";
import { FileUploadInput } from "../file/file.input";

@InputType()
export class CreateStyleInput {
  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field(() => [FileUploadInput], { nullable: true })
  techPack?: FileUploadInput[];
}

@InputType()
export class UploadTechPackInput {
  @Field()
  code!: string;

  @Field(() => [FileUploadInput])
  techPack!: FileUploadInput[];
}
