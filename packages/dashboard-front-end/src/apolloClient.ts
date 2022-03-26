import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { REACT_APP_APOLLO_SERVER_URI } from "./config";
import { setContext } from "@apollo/client/link/context";

export default function createClient(authToken: string | null) {
  const httpLink = createHttpLink({
    uri: REACT_APP_APOLLO_SERVER_URI,
  });

  const authLink = createAuthLink(authToken);

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

function createAuthLink(token: string | null) {
  return setContext((_, { headers }: { headers: object }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
}
