import { Field, InputType } from "type-graphql";

@InputType()
export class CreateFactoryInput {
  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field()
  address!: string;

  @Field({ nullable: true })
  email?: string;
}
