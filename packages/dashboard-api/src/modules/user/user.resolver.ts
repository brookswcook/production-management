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
      const {
        id,
        role,
        firstName,
        password: encryptedPassword,
      } = (await UserModel.getUserByEmailOrFail(email)) as {
        id: string;
      } & User;
      const passwordIsRight = await isPasswordCorrect(
        password,
        encryptedPassword
      );
      if (!passwordIsRight) {
        throw new UserInputError("Wrong password");
      }

      return signUserToken({ id, role, firstName });
    } catch (error) {
      throw new UserInputError("Wrong login details");
    }
  }
}
