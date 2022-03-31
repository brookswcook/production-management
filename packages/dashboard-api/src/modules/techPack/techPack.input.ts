import { Field, InputType } from "type-graphql";

@InputType()
export class UploadTechPackInput {
  @Field({ nullable: false })
  productName!: string;

  @Field({ nullable: false })
  fabricCode!: string;

  @Field({ nullable: true })
  print?: string;

  @Field({ nullable: true })
  pantone?: string;
}
