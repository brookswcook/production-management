import { UserPayload } from "./jwt";

export type ResolverContext = {
  user: UserPayload;
};
