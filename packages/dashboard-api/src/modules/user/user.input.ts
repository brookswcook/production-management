import { UserRole } from "dashboard-core";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  token!: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  email!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  role!: UserRole;
}
