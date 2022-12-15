import {
  getModelForClass,
  ModelOptions,
  prop as Property,
  ReturnModelType,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";
import { UserRole } from "dashboard-core";

@ModelOptions({ schemaOptions: { timestamps: true } })
@ObjectType()
export class User extends TimeStamps {
  @Field()
  id?: string;

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

  static async getUserByEmailOrFail(
    this: ReturnModelType<typeof User>,
    email: string,
    deleted = false,
    disabled = false
  ) {
    const user = await this.findOne({ email, deleted, disabled }).exec();
    if (user == null) throw new Error("User is not found");
    return user;
  }

  static async getUserByIdOrFail(
    this: ReturnModelType<typeof User>,
    id: string
  ) {
    const user = await this.findOne({ _id: id }).exec();
    if (user == null) throw new Error("User is not found");
    return user;
  }

  static parseFactoryNameRole(role: string) {
    const factoryRoleMatch = role.match(/(?<=^Factory:)\w+$/);
    if (factoryRoleMatch != null && factoryRoleMatch.length > 0) {
      return factoryRoleMatch.pop();
    } else return null;
  }
}

@ObjectType()
export class LoginResult {
  @Field()
  token!: string;
}

export const UserModel = getModelForClass(User);
