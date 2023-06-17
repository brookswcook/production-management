import { Context } from "apollo-server-core";
import { AuthChecker } from "type-graphql";
import { ResolverContext } from "./graphql";
import { authorizeByRole } from "dashboard-core";

// TODO: later it might make sense to use class class authChecker see typegraphql-authorization page
export const authChecker: AuthChecker<Context<ResolverContext>> = (
  { root: _root, args: _args, context, info: _info },
  authRuleRoles
) => {
  if (context.user == null) return false;
  const {
    user: { role: userRole },
  } = context;
  return authorizeByRole(userRole, authRuleRoles);
};
