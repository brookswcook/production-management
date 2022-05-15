import { Context } from "apollo-server-core";
import { AuthChecker } from "type-graphql";
import { compare } from "bcrypt";
import { ResolverContext } from "./graphql";

// TODO: later it might make sense to use class class authChecker see typegraphql-authorization page
export const authChecker: AuthChecker<Context<ResolverContext>> = (
  { root, args, context, info },
  authRuleRoles
) => {
  if (context.user == null) return false;
  const {
    user: { role: userRole },
  } = context;
  if (authRuleRoles.length > 0) {
    return (
      context.user != null &&
      authRuleRoles.some(authRuleRole =>
        new RegExp(`^${authRuleRole}$`).test(userRole)
      )
    );
  }
  return true;
};

export function isPasswordCorrect(data: string, encrypted: string) {
  return compare(data, encrypted);
}
