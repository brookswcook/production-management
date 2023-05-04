import { UserRole } from "dashboard-core";
import { Service } from "typedi";
import { sendMessageToDevice } from "../../lib/firebase";
import { NotificationSubscriptionService } from "../notificationSubscription/notificationSubscription.service";
import { ActionLog, ActionLogModel } from "./actionLog.model";

type NotificationPayload = {
  title: string;
  body: string;
};

@Service()
export class ActionLogService {
  constructor(
    private readonly notificationSubscriptionService: NotificationSubscriptionService
  ) {}

  createLogRecord(logRecord: Omit<ActionLog, "id" | "user">) {
    void new ActionLogModel(logRecord).save();
  }

  async createLogRecordWithNotification(
    logRecord: Omit<ActionLog, "id" | "user">,
    notificationData: { payload: NotificationPayload; roles: UserRole[] }
  ) {
    await new ActionLogModel(logRecord).save();
    // TODO: it makes sense to extend actionLog with notify:true;
    // keep track of such records and generate notifications once new record is created
    const { companyId } = logRecord;
    const {
      payload: { title, body },
      roles,
    } = notificationData;
    const notificationTokens =
      await this.notificationSubscriptionService.getNotificationTokensByUserRole(
        companyId,
        roles
      );
    await sendMessageToDevice(notificationTokens, {
      notification: { title, body },
    });
  }
}
