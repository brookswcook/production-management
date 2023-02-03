import { InputType, Field } from "type-graphql";

@InputType()
export class CreateAttributeInput {
  @Field()
  key!: string;

  @Field()
  value!: string;

  @Field({ nullable: true })
  unit?: string;
}
