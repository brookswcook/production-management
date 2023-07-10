import { ReactElement, useContext, useEffect, useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import createApolloClient from "../../apolloClient";
import { AuthContext, AuthProvider } from "../Auth/AuthProvider";
import { ToastContainer } from "react-toastify";
import AppRouter from "./AppRouter";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";

function ApolloApp() {
  const { token, signOut } = useContext(AuthContext);
  const [apolloClient, setApolloClient] = useState<
    ApolloClient<NormalizedCacheObject>
  >(createApolloClient(token, signOut));

  useEffect(() => {
    setApolloClient(createApolloClient(token, signOut));
  }, [token]);

  return (
    <ApolloProvider client={apolloClient}>
      <AppRouter />
      <ToastContainer />
    </ApolloProvider>
  );
}

export default function App(): ReactElement {
  return (
    <AuthProvider>
      <ApolloApp />
    </AuthProvider>
  );
}
