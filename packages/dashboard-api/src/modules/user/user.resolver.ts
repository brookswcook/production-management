import { UserInputError } from "apollo-server-core";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { LoginInput } from "./user.input";
import { User, UserModel } from "./user.model";
import { signUserToken } from "../../lib/jwt";
import { isPasswordCorrect } from "../../lib/auth";

@Resolver(User)
export class UserResolver {
  @Authorized()
  @Query(() => [User])
  async users() {
    return UserModel.find().exec();
  }

  @Mutation(() => String)
  async login(@Arg("data") { email, password }: LoginInput): Promise<string> {
    try {
      const user = await UserModel.getUserByEmailOrFail(email);
      const passwordIsRight = await isPasswordCorrect(password, user.password);
      if (!passwordIsRight) {
        throw new UserInputError("Wrong password");
      }

      return signUserToken({ id: user.id as string });
    } catch (error) {
      throw new UserInputError("Wrong login details");
    }
  }
}
