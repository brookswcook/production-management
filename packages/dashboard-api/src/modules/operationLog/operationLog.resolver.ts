import { Authorized, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { OperationLog, OperationLogModel } from "./operationLog.model";

@Resolver(OperationLog)
export class OperationLogResolver {
  @FieldResolver(() => Date, { nullable: true })
  createdAt(@Root("_doc") opLog: OperationLog) {
    return opLog.createdAt;
  }

  @Authorized("Admin")
  @Query(() => [OperationLog])
  operationLogs() {
    return OperationLogModel.find().sort({ _id: -1 }).populate("user").exec();
  }
}
