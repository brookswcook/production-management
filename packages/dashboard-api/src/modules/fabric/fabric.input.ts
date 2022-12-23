import { Field, InputType } from "type-graphql";
import { IFactoryTenant } from "../factory/types";
import { FileUploadInput } from "../file/file.input";

@InputType()
export class CreateFabricInput implements IFactoryTenant {
  @Field()
  code!: string;

  @Field({ nullable: false })
  title!: string;

  @Field({ nullable: false })
  factoryCode!: string;

  @Field()
  colorName!: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  colorCode?: string;

  @Field(() => FileUploadInput, { nullable: true })
  print?: FileUploadInput;
}

@InputType()
export class UploadPrintInput {
  @Field()
  code!: string;

  @Field(() => FileUploadInput)
  print!: FileUploadInput;
}
