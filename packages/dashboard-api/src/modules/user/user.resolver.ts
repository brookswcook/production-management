import {
  ApolloError,
  AuthenticationError,
  UserInputError,
} from "apollo-server-core";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import {
  CreateUserInput,
  DeleteUserInput,
  LoginInput,
  UpdateUserInput,
} from "./user.input";
import { LoginResult, User, UserModel } from "./user.model";
import { signUserToken } from "../../lib/jwt";
import {
  createUser as createFirebaseUser,
  updateUser as updateFirebaseUser,
  deleteUser as deleteFirebaseUser,
  getUser as getFirebaseUser,
  verifyToken,
  FirebaseUserType,
  FirebaseUserMetadataType,
} from "../../lib/firebase";
import { ResolverContext } from "../../lib/graphql";

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => FirebaseUser, { nullable: true })
  async firebaseUser(@Root() { email }: User): Promise<FirebaseUser | null> {
    return getFirebaseUser(email);
  }

  @Authorized(["Admin"])
  @Query(() => [User])
  async users() {
    return UserModel.find({ deleted: false }).exec();
  }

  @Authorized(["Admin"])
  @Mutation(() => User)
  async createUser(
    @Arg("data")
    {
      email,
      firstName,
      lastName,
      role,
      companyId: inputCompanyId,
    }: CreateUserInput,
    @Ctx() { user: { companyId: adminCompanyId } }: ResolverContext
  ): Promise<User> {
    try {
      await createFirebaseUser({ email });
      const companyId = inputCompanyId ?? adminCompanyId;
      return await UserModel.findOneAndUpdate(
        { email },
        {
          $set: {
            firstName,
            lastName,
            role,
            companyId,
            deleted: false,
          },
        },
        { upsert: true, new: true }
      ).exec();
    } catch (error) {
      throw new UserInputError((error as Error).message);
    }
  }

  @Authorized(["Admin"])
  @Mutation(() => User)
  async updateUser(
    @Arg("data") { email, ...props }: UpdateUserInput
  ): Promise<User> {
    try {
      const apiUser = await UserModel.getUserByEmailOrFail(email);
      Object.assign(apiUser, props);
      const savedApiUser = await apiUser.save();
      props.disabled != null &&
        (await updateFirebaseUser(savedApiUser.email, {
          disabled: props.disabled,
        }));
      return savedApiUser;
    } catch (error) {
      throw new UserInputError((error as Error).message);
    }
  }

  @Authorized(["Admin"])
  @Mutation(() => Boolean)
  async deleteUser(@Arg("data") { email }: DeleteUserInput): Promise<boolean> {
    try {
      await UserModel.findOneAndUpdate({ email }, { deleted: true });
      await deleteFirebaseUser(email);
      return true;
    } catch (error) {
      throw new UserInputError((error as Error).message);
    }
  }

  @Mutation(() => LoginResult)
  async login(@Arg("data") { token }: LoginInput): Promise<{ token: string }> {
    try {
      const { email, email_verified } = await verifyToken(token);

      if (email == null)
        throw new AuthenticationError("Not possible to associate logged user");

      if (!email_verified)
        throw new AuthenticationError("User email is not verified");

      const { id, role, firstName, companyId } =
        (await UserModel.getUserByEmailOrFail(email)) as {
          id: string;
        } & User;

      return { token: signUserToken({ id, role, firstName, companyId }) };
    } catch (error) {
      throw new AuthenticationError((error as ApolloError).message);
    }
  }
}

@ObjectType()
export class FirebaseUserMetadata implements Partial<FirebaseUserMetadataType> {
  @Field({ nullable: true })
  creationTime?: string;

  @Field({ nullable: true })
  lastSignInTime?: string;
}

@ObjectType()
export class FirebaseUser implements Partial<FirebaseUserType> {
  @Field()
  uid!: string;

  @Field()
  emailVerified!: boolean;

  @Field()
  disabled!: boolean;

  @Field(() => FirebaseUserMetadata)
  metadata!: FirebaseUserMetadataType;
}
