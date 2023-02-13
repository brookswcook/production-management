import { Authorized, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { TenantId } from "../user/user.decorator";
import { ActionLog, ActionLogModel } from "./actionLog.model";

@Resolver(ActionLog)
export class ActionLogResolver {
  @FieldResolver(() => Date, { nullable: true })
  createdAt(@Root() opLog: ActionLog) {
    return opLog.createdAt;
  }

  @Authorized("Admin")
  @Query(() => [ActionLog])
  actionLogs(@TenantId() companyId: string) {
    return ActionLogModel.find({ companyId })
      .sort({ _id: -1 })
      .populate("user")
      .exec();
  }
}
