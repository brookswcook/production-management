import {
  getModelForClass,
  ModelOptions,
  prop as Property,
  ReturnModelType,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";
import { UserPayload, UserRole } from "dashboard-core";
import { ExpectResultModel } from "../common/expectResultModel";

@ModelOptions({ schemaOptions: { timestamps: true } })
@ObjectType()
export class User extends ExpectResultModel implements UserPayload, TimeStamps {
  @Field()
  id!: string;

  @Field()
  @Property({ unique: true, required: true })
  email!: string;

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

  static async getUserEmails(query: Partial<User>): Promise<string[]> {
    const emails = await UserModel.find(query, { _id: 0, email: 1 }).lean();
    return emails.map(item => item.email);
  }

  static parseFactoryNameRole(role: string) {
    const factoryRoleMatch = role.match(/(?<=^Factory:)\w+$/);
    if (factoryRoleMatch != null && factoryRoleMatch.length > 0) {
      return factoryRoleMatch.pop();
    } else return null;
  }

  static buildFactoryRole(factoryCode: string) {
    return `Factory:${factoryCode}`;
  }
}

@ObjectType()
export class LoginResult {
  @Field()
  token!: string;
}

export const UserModel = getModelForClass(User);
