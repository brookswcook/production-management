import { UserRole } from "dashboard-core";
import { Service } from "typedi";
import { UserService } from "../user/user.service";
import { NotificationSubscription } from "./notificationSubscription.model";

@Service()
export class NotificationSubscriptionService {
  constructor(private readonly userService: UserService) {
    this.userService = new UserService();
  }

  async getNotificationTokensByUserRole(companyId: string, roles: UserRole[]) {
    const userIds = await this.userService.getUserIdsByRoles(companyId, roles);
    return await NotificationSubscription.getNotificationTokens({
      companyId,
      userId: { $in: userIds },
    });
  }
}
