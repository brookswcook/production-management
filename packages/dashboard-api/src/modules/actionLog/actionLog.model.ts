import {
  getModelForClass,
  index,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";
import { ExpectResultModel } from "../common/expectResultModel";
import { User } from "../user/user.model";

@index<ActionLog>({ companyId: 1, entityType: 1, entityId: 1 })
@ModelOptions({
  schemaOptions: { collection: "action_logs", timestamps: true },
})
@ObjectType()
export class ActionLog extends ExpectResultModel implements TimeStamps {
  @Field()
  id!: string;

  @Property({ required: true })
  companyId!: string;

  @Field()
  @Property({ required: true })
  userId!: string;

  @Field()
  @Property({ required: true })
  entityId!: string;

  @Field()
  @Property({ required: true })
  title!: string;

  @Field()
  @Property({ required: true })
  entityType!: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => User, { nullable: true })
  @Property({
    ref: () => User,
    foreignField: "_id",
    localField: "userId",
    justOne: true,
  })
  user!: User;
}

export const ActionLogModel = getModelForClass(ActionLog);
