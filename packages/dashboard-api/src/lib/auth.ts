import { Context } from "apollo-server-core";
import { AuthChecker } from "type-graphql";
import { compare } from "bcrypt";
import { ResolverContext } from "./graphql";

// TODO: later it might make sense to use class class authChecker see typegraphql-authorization page
export const authChecker: AuthChecker<Context<ResolverContext>> = (
  { root, args, context, info },
  roles
) => {
  const {
    user: { role },
  } = context;
  if (context.user == null) return false;
  if (roles.length > 0) {
    return (
      context.user != null && roles.some(expectedRole => role === expectedRole)
    );
  }
  return true;
};

export function isPasswordCorrect(data: string, encrypted: string) {
  return compare(data, encrypted);
}
