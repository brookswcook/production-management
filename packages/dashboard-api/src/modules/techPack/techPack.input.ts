import { Field, InputType } from "type-graphql";

@InputType()
export class UploadTechPackInput {
  @Field()
  productName!: string;

  @Field()
  fabricCode!: string;

  @Field({ nullable: true })
  print?: string;

  @Field({ nullable: true })
  pantone?: string;
}
