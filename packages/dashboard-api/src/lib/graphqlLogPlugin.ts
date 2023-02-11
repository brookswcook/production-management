import { GraphQLRequestContext } from "apollo-server-core";
import { OperationLogModel } from "../modules/operationLog/operationLog.model";
import { ResolverContext } from "./graphql";
import logger from "./logger";

export const logPlugin = {
  // eslint-disable-next-line @typescript-eslint/require-await
  async requestDidStart({
    request: { query, operationName: name, variables: variablesObject },
    context: { user },
  }: GraphQLRequestContext<ResolverContext>) {
    return {
      async willSendResponse(requestContext: {
        errors?: unknown;
      }): Promise<void> {
        if (
          requestContext.errors != null ||
          query == null ||
          name == null ||
          variablesObject == null ||
          user == null
        )
          return;
        const { id: userId, companyId } = user;
        const isMutation = query.match(/^\w+/)?.pop() === "mutation";
        if (isMutation) {
          try {
            const variables = JSON.stringify(variablesObject, null, 2);
            // TODO: replace with service call
            await OperationLogModel.createLogRecord({
              name,
              variables,
              userId,
              companyId,
            });
          } catch (err) {
            logger.error(err);
            throw err;
          }
        }
      },
    };
  },
};
