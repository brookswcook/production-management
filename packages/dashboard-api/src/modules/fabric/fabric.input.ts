import { Field, InputType } from "type-graphql";
import { FileUploadInput } from "../file/file.input";

@InputType()
export class CreateFabricInput {
  @Field()
  code!: string;

  @Field()
  colorName!: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  colorCode?: string;

  @Field(() => FileUploadInput, { nullable: true })
  printUrl?: FileUploadInput;
}
