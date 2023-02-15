import { Field, InputType } from "type-graphql";

@InputType()
export class GetActionLogsInput {
  @Field(() => [String])
  entityTypes!: string[];

  @Field(() => [String])
  entityIds!: string[];
}
