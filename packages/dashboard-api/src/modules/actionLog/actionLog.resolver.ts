import {
  Arg,
  Authorized,
  FieldResolver,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { TenantId } from "../user/user.decorator";
import { GetActionLogsInput } from "./actionLog.input";
import { ActionLog, ActionLogModel } from "./actionLog.model";

@Resolver(ActionLog)
export class ActionLogResolver {
  @FieldResolver(() => Date)
  createdAt(@Root() { createdAt }: ActionLog) {
    return createdAt;
  }

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
