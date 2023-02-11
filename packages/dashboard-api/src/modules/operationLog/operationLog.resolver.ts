import { Authorized, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { TenantId } from "../user/user.decorator";
import { OperationLog, OperationLogModel } from "./operationLog.model";

@Resolver(OperationLog)
export class OperationLogResolver {
  @FieldResolver(() => Date, { nullable: true })
  createdAt(@Root() opLog: OperationLog) {
    return opLog.createdAt;
  }

  @Authorized("Admin")
  @Query(() => [OperationLog])
  operationLogs(@TenantId() companyId: string) {
    return OperationLogModel.find({ companyId })
      .sort({ _id: -1 })
      .populate("user")
      .exec();
  }
}
