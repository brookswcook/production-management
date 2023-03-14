import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { ResolverContext } from "../../lib/graphql";
import { TenantId } from "../user/user.decorator";
import { CreateNotificationSubscriptionInput } from "./notificationSubscription.input";
import {
  NotificationSubscription,
  NotificationSubscriptionModel,
} from "./notificationSubscription.model";

@Resolver(NotificationSubscription)
export class NotificationSubscriptionResolver {
  @Authorized()
  @Mutation(() => NotificationSubscription)
  async createNotificationSubscription(
    @TenantId() companyId: string,
    @Arg("data") { token }: CreateNotificationSubscriptionInput,
    @Ctx() { user: { id: userId } }: ResolverContext
  ): Promise<NotificationSubscription> {
    return await NotificationSubscriptionModel.findOneAndUpdate(
      {
        companyId,
        userId,
        token,
      },
      { companyId, userId, token },
      { upsert: true, new: true }
    ).exec();
  }
}
