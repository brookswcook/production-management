import { UserRole } from "dashboard-core";
import { Field, InputType } from "type-graphql";
import { User } from "./user.model";

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

  @Field({ nullable: true })
  companyId?: string;
}

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field()
  email!: string;

  @Field()
  role?: UserRole;

  @Field()
  disabled?: boolean;
}

@InputType()
export class DeleteUserInput {
  @Field()
  email!: string;
}
