import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { ResolverContext } from "../../lib/graphql";
import { TenantId } from "../user/user.decorator";
import { CreateNotificationSubscriptionInput } from "./notificationSubscription.input";
import {
  NotificationSubscription,
  NotificationSubscriptionModel,
} from "./notificationSubscription.model";

@Service()
@Resolver(NotificationSubscription)
export class NotificationSubscriptionResolver {
  @Authorized()
  @Mutation(() => NotificationSubscription)
  async createNotificationSubscription(
    @TenantId() companyId: string,
    @Arg("data") { token, userAgent }: CreateNotificationSubscriptionInput,
    @Ctx() { user: { id: userId } }: ResolverContext
  ): Promise<NotificationSubscription> {
    return await NotificationSubscriptionModel.findOneAndUpdate(
      {
        companyId,
        userId,
        userAgent,
      },
      { companyId, userId, userAgent, token },
      { upsert: true, new: true }
    ).exec();
  }
}
