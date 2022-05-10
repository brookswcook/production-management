import {
  getModelForClass,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";
import { User } from "../user/user.model";

@ModelOptions({ schemaOptions: { timestamps: true } })
@ObjectType()
export class OperationLog extends TimeStamps {
  @Field()
  @Property({ required: true })
  name!: string;

  @Field()
  @Property({ required: true })
  userId!: string;

  @Field()
  @Property({ required: true })
  variables!: string;

  @Field(() => User, { nullable: true })
  @Property({
    ref: () => User,
    foreignField: "_id",
    localField: "userId",
    justOne: true,
  })
  user!: User;

  static createLogRecord(data: Omit<OperationLog, "user">) {
    return new OperationLogModel(data).save();
  }
}

export const OperationLogModel = getModelForClass(OperationLog);
