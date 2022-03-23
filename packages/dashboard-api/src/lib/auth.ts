import { Context } from "apollo-server-core";
import { AuthChecker } from "type-graphql";

export const authChecker: AuthChecker<Context<{ user: object }>> = (
  { root, args, context, info },
  roles
) => {
  return context.user != null;
};
