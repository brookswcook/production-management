import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { config } from "./config";
import { createUploadLink } from "apollo-upload-client";

export default function createClient(
  authToken: string | null
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    link: createUploadLink({
      uri: config.apolloURI,
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : "",
      },
    }),
    cache: new InMemoryCache(),
  });
}
