import { UserPayload } from "dashboard-core";
import DataLoader from "dataloader";

export type ResolverContext = {
  user: UserPayload;
  loaders: { [name: string]: DataLoader<unknown, unknown> };
};
