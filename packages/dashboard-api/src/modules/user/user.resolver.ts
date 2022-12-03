import { ApolloError, AuthenticationError } from "apollo-server-core";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { LoginInput } from "./user.input";
import { LoginResult, User, UserModel } from "./user.model";
import { signUserToken } from "../../lib/jwt";
import { verifyToken } from "../../lib/firebase";

@Resolver(User)
export class UserResolver {
  @Authorized()
  @Query(() => [User])
  async users() {
    return UserModel.find().exec();
  }

  @Mutation(() => LoginResult)
  async login(@Arg("data") { token }: LoginInput): Promise<{ token: string }> {
    try {
      const { email, email_verified } = await verifyToken(token);

      if (email == null)
        throw new AuthenticationError("Not possible to associate logged user");

      if (!email_verified)
        throw new AuthenticationError("User email is not verified");

      const { id, role, firstName } = (await UserModel.getUserByEmailOrFail(
        email
      )) as {
        id: string;
      } & User;

      return { token: signUserToken({ id, role, firstName }) };
    } catch (error) {
      throw new AuthenticationError((error as ApolloError).message);
    }
  }
}
