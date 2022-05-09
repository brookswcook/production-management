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

  @Property({ required: true })
  password!: string;

  @Field()
  @Property({ required: true })
  firstName!: string;

  @Field()
  @Property({ required: true })
  lastName!: string;

  @Field()
  @Property({ required: true })
  role!: UserRole;

  static async getUserByEmailOrFail(
    this: ReturnModelType<typeof User>,
    email: string
  ) {
    const user = await this.findOne({ email }).exec();
    if (user == null) throw new Error("User not found");
    return user;
  }
}

export const UserModel = getModelForClass(User);
