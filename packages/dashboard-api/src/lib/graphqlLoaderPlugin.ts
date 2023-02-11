import { GraphQLRequestContext, PluginDefinition } from "apollo-server-core";
import DataLoader from "dataloader";
import glob from "glob-promise";
import { ResolverContext } from "./graphql";

// TODO: use factory function and weakmap per context to initialize loader only if needed once instead of initializing all loaders every request
export function graphqlLoaderPlugin(loadersPathGlob: string): PluginDefinition {
  let loaderModulesPaths: string[] = [];
  return {
    async serverWillStart() {
      loaderModulesPaths = await glob.promise(loadersPathGlob);
    },
    async requestDidStart({ context }: GraphQLRequestContext<ResolverContext>) {
      let loaders: { [name: string]: DataLoader<unknown, unknown> } = {};
      for await (const loaderModulePath of loaderModulesPaths) {
        const loaderModuleObject = (await import(loaderModulePath)) as {
          [name: string]: DataLoader<unknown, unknown>;
        };
        loaders = { ...loaders, ...loaderModuleObject };
      }
      context.loaders = loaders;
    },
  };
}
