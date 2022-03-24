import { Context } from "apollo-server-core";
import { AuthChecker } from "type-graphql";
import { compare } from "bcrypt";

export const authChecker: AuthChecker<Context<{ user: object }>> = (
  { root, args, context, info },
  roles
) => {
  return context.user != null;
};

export function isPasswordCorrect(data: string, encrypted: string) {
  return compare(data, encrypted);
}
