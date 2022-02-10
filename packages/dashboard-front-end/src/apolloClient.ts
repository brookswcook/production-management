import { ApolloClient, InMemoryCache } from "@apollo/client";
import { REACT_APP_APOLLO_SERVER_URI } from "./config";

const client = new ApolloClient({
  uri: REACT_APP_APOLLO_SERVER_URI,
  cache: new InMemoryCache(),
});

export default client;
