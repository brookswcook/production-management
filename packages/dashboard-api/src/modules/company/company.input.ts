import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCompanyInput {
  @Field()
  name!: string;

  @Field()
  address!: string;

  @Field({ nullable: true })
  parentId?: string;

  @Field()
  role!: "Owner" | "Factory";
}
