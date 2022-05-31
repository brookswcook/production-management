import { Context } from "apollo-server-core";
import { AuthChecker } from "type-graphql";
import { compare } from "bcrypt";
import { ResolverContext } from "./graphql";
import { authorizeByRole } from "dashboard-core";

// TODO: later it might make sense to use class class authChecker see typegraphql-authorization page
export const authChecker: AuthChecker<Context<ResolverContext>> = (
  { root, args, context, info },
  authRuleRoles
) => {
  if (context.user == null) return false;
  const {
    user: { role: userRole },
  } = context;
  return authorizeByRole(userRole, authRuleRoles);
};

export function isPasswordCorrect(data: string, encrypted: string) {
  return compare(data, encrypted);
}
