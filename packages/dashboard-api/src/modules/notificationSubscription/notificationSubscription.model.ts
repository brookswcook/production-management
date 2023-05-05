import {
  getModelForClass,
  index,
  prop as Property,
} from "@typegoose/typegoose";
import { ModelOptions } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { FilterQuery } from "mongoose";
import { Field, ObjectType } from "type-graphql";
import { ExpectResultModel } from "../common/expectResultModel";

@index<NotificationSubscription>(
  { companyId: 1, userId: 1, fingerprint: 1 },
  { unique: true }
)
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

  @Field()
  @Property({ required: true })
  fingerprint!: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  static async getNotificationTokens(
    query: FilterQuery<NotificationSubscription>
  ): Promise<string[]> {
    const subscriptions = await NotificationSubscriptionModel.find(query, {
      _id: 0,
      token: 1,
    }).lean();
    return subscriptions.map(({ token }) => token);
  }
}

export const NotificationSubscriptionModel = getModelForClass(
  NotificationSubscription
);
