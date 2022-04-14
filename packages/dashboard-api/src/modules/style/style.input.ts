import { Field, InputType } from "type-graphql";

@InputType()
export class CreateStyleInput {
  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  techPackUrl?: string;
}

@InputType()
export class UploadTechPackInput {
  @Field()
  code!: string;

  @Field()
  techPackUrl!: string;
}
