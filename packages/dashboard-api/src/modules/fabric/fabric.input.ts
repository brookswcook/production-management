import { Field, InputType } from "type-graphql";

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

  @Field({ nullable: true })
  printUrl?: string;
}
