import { Authorized, Query, Resolver } from "type-graphql";
import { User, UserModel } from "./user.model";

@Resolver(User)
export class UserResolver {
  @Authorized()
  @Query(() => User)
  async user() {
    const user = await new UserModel({ name: "Vitali" }).save();
    return user;
  }
}
