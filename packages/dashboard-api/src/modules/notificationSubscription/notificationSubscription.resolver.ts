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
    @Arg("data") { token, fingerprint }: CreateNotificationSubscriptionInput,
    @Ctx() { user: { id: userId } }: ResolverContext
  ): Promise<NotificationSubscription> {
    return await NotificationSubscriptionModel.findOneAndUpdate(
      {
        companyId,
        userId,
        fingerprint,
      },
      { companyId, userId, fingerprint, token },
      { upsert: true, new: true }
    ).exec();
  }
}
