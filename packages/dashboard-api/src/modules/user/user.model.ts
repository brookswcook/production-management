import {
  getModelForClass,
  index,
  ModelOptions,
  prop as Property,
  ReturnModelType,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";
import { UserPayload, UserRole } from "dashboard-core";
import { ExpectResultModel } from "../common/expectResultModel";
import { FilterQuery } from "mongoose";
import { ISlug } from "../common/types";

// TODO: add unique compound index {companyId, email} once we support multitenancy in auth; until then email should be unique
@index<User>(
  { companyId: 1, pointOfContact: 1 },
  { unique: true, partialFilterExpression: { pointOfContact: true } }
)
@ModelOptions({ schemaOptions: { timestamps: true } })
@ObjectType()
export class User
  extends ExpectResultModel
  implements UserPayload, TimeStamps, ISlug
{
  @Field()
  id!: string;

  @Field()
  @Property({
    get(this: User) {
      return this.email;
    },
  })
  code!: string;

  @Field()
  @Property({ unique: true, required: true })
  email!: string;

  @Field({ nullable: true })
  @Property()
  phone?: string;

  @Field()
  @Property({ required: true })
  firstName!: string;

  @Field()
  @Property({ required: true })
  lastName!: string;

  @Field()
  @Property({
    get(this: User) {
      return `${this.firstName} ${this.lastName}`;
    },
  })
  fullName!: string;

  @Field()
  @Property({ required: true })
  companyId!: string;

  @Field()
  @Property({ required: true, default: false })
  pointOfContact!: boolean;

  @Field()
  @Property({ required: true, default: false })
  disabled!: boolean;

  // TODO: to think about how soft delete can be extended on other entities
  @Field()
  @Property({ required: true, default: false })
  deleted!: boolean;

  @Field()
  @Property({ required: true })
  role!: UserRole;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  static async getUserByEmailOrFail(
    this: ReturnModelType<typeof User>,
    email: string,
    deleted = false,
    disabled = false
  ) {
    return this.findOneOrFail({ email, deleted, disabled });
  }

  static async getUserContactDetails(
    query: Partial<User>
  ): Promise<UserContactDetails[]> {
    return await UserModel.find(
      { ...query, ...{ pointOfContact: true } },
      {
        _id: 0,
        firstName: 1,
        lastName: 1,
        fullName: 1,
        email: 1,
        phone: 1,
      }
    ).exec();
  }

  static async getUserEmails(query: Partial<User>): Promise<string[]> {
    const emails = await UserModel.find(query, { _id: 0, email: 1 }).lean();
    return emails.map(item => item.email);
  }

  static async getUserIds(query: FilterQuery<User>): Promise<string[]> {
    const users = await UserModel.find<{ id: string }>(query, {
      _id: 1,
    }).exec();
    return users.map(item => item.id);
  }
}

@ObjectType()
export class LoginResult {
  @Field()
  token!: string;
}

export const UserModel = getModelForClass(User);

@ObjectType()
export class UserContactDetails {
  @Field()
  fullName!: string;

  @Field()
  email!: string;

  @Field({ nullable: true })
  phone?: string;
}
