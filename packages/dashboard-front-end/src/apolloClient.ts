import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { REACT_APP_APOLLO_SERVER_URI } from "./config";
import { createUploadLink } from "apollo-upload-client";

export default function createClient(
  authToken: string | null
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    link: createUploadLink({
      uri: REACT_APP_APOLLO_SERVER_URI,
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : "",
      },
    }),
    cache: new InMemoryCache(),
  });
}
