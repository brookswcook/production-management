import { InputType, Field } from "type-graphql";

@InputType()
export class CreateNotificationSubscriptionInput {
  @Field()
  token!: string;

  @Field()
  userAgent!: string;
}
