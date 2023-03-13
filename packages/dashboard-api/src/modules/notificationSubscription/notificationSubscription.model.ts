import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ModelOptions } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";
import { ExpectResultModel } from "../common/expectResultModel";

@ModelOptions({
  schemaOptions: { timestamps: true, collection: "notification_subscriptions" },
})
@ObjectType()
export class NotificationSubscription
  extends ExpectResultModel
  implements TimeStamps
{
  @Field()
  id!: string;

  @Field()
  @Property({ required: true })
  companyId!: string;

  @Field()
  @Property({ required: true })
  userId!: string;

  @Field()
  @Property({ required: true })
  token!: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

export const NotificationSubscriptionModel = getModelForClass(
  NotificationSubscription
);
