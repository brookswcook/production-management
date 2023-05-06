import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { TenantId } from "../user/user.decorator";
import { GetActionLogsInput } from "./actionLog.input";
import { ActionLog, ActionLogModel } from "./actionLog.model";

@Service()
@Resolver(ActionLog)
export class ActionLogResolver {
  @Authorized("Admin")
  @Query(() => [ActionLog])
  actionLogs(
    @TenantId() companyId: string,
    @Arg("data", { nullable: true }) data: GetActionLogsInput
  ) {
    let query:
      | Record<
          keyof Pick<ActionLog, "entityType" | "entityId">,
          { [x: string]: string[] }
        >
      | object = {};
    if (data != null) {
      query = {
        entityType: { $in: data.entityTypes },
        entityId: { $in: data.entityIds },
      };
    }
    return ActionLogModel.find({ ...query, companyId })
      .sort({ _id: -1 })
      .populate("user")
      .exec();
  }
}
