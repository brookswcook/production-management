import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  from,
  ServerError,
} from "@apollo/client";
import { config } from "./config";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";

export default function createClient(
  authToken: string | null,
  resetTokenHandler: VoidFunction
): ApolloClient<NormalizedCacheObject> {
  const terminatingLink = createUploadLink({
    uri: config.apolloURI,
    headers: {
      authorization: authToken ? `Bearer ${authToken}` : "",
    },
  });

  const resetTokenLink = onError(({ networkError }) => {
    if (networkError && networkError.name === "ServerError") {
      const { statusCode } = networkError as ServerError;
      if (statusCode === 401) resetTokenHandler();
      location.reload();
    }
  });

  return new ApolloClient({
    link: from([resetTokenLink, terminatingLink]),
    cache: new InMemoryCache(),
  });
}
