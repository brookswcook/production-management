import { UserRole } from "dashboard-core";
import { UserService } from "../user/user.service";
import { NotificationSubscription } from "./notificationSubscription.model";

export class NotificationSubscriptionService {
  constructor(private readonly userService: UserService) {
    this.userService = new UserService();
  }

  async getNotificationTokensByUserRole(companyId: string, role: UserRole) {
    const userIds = await this.userService.getUserIdsByRole(companyId, role);
    return await NotificationSubscription.getNotificationTokens({
      companyId,
      userId: { $in: userIds },
    });
  }
}
