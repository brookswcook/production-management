import { Field, InputType } from "type-graphql";

@InputType()
export class UploadTechPackInput {
  @Field()
  productTitle!: string;

  @Field()
  fabricCode!: string;

  @Field({ nullable: true })
  print?: string;

  @Field({ nullable: true })
  pantone?: string;
}
