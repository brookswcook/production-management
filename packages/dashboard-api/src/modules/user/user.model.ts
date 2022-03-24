import {
  getModelForClass,
  prop as Property,
  ReturnModelType,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  @Property({ unique: true, required: true })
  email!: string;

  @Property({ required: true })
  password!: string;

  @Field()
  @Property({ default: new Date(), required: true })
  date!: Date;

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
