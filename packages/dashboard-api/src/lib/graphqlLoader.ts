import DataLoader from "dataloader";
import { createParamDecorator } from "type-graphql";
import { ResolverContext } from "./graphql";

export function getLoader<K, V>(
  name: string,
  { loaders }: ResolverContext
): DataLoader<K, V> {
  return loaders[name] as DataLoader<K, V>;
}

export function Loader<K, V>(name: string): ParameterDecorator {
  return createParamDecorator<ResolverContext>(
    ({ context }): DataLoader<K, V> => {
      return getLoader(name, context);
    }
  );
}
