import { UserInputError } from "apollo-server-core";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { LoginInput } from "./user.input";
import { LoginResult, User, UserModel } from "./user.model";
import { signUserToken } from "../../lib/jwt";
import { isPasswordCorrect } from "../../lib/auth";
import { UserRole } from "dashboard-core";

@Resolver(User)
export class UserResolver {
  @Authorized()
  @Query(() => [User])
  async users() {
    return UserModel.find().exec();
  }

  @Mutation(() => LoginResult)
  async login(
    @Arg("data") { email, password }: LoginInput
  ): Promise<{ token: string; role: UserRole }> {
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

      return { token: signUserToken({ id, role, firstName }), role };
    } catch (error) {
      throw new UserInputError("Wrong login details");
    }
  }
}
