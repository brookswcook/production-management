import { GraphQLRequestContext } from "apollo-server-core";
import { OperationLogModel } from "../modules/operationLog/operationLog.model";
import { ResolverContext } from "./graphql";
import logger from "./logger";

export const logPlugin = {
  async requestDidStart({
    request: { query, operationName: name, variables: variablesObject },
    context: {
      user: { id: userId },
    },
  }: GraphQLRequestContext<ResolverContext>) {
    if (query == null || name == null || variablesObject == null) return;
    const isMutation = query.match(/^\w+/)?.pop() === "mutation";
    if (isMutation) {
      try {
        const variables = JSON.stringify(variablesObject);
        await OperationLogModel.createLogRecord({ name, variables, userId });
      } catch (err) {
        logger.error(err);
        throw err;
      }
    }
  },
};
