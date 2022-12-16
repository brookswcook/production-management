import { decodeToken, UserPayload, DecodedTokenPayload } from "dashboard-core";
import { createContext, ReactElement, useEffect, useState } from "react";
import useToken from "./useToken";

interface AuthContextType {
  token: string | null;
  decodedToken: DecodedTokenPayload<UserPayload> | null;
  signIn: ({ token }: { token: string | null }) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  decodedToken: null,
  signIn() {},
  signOut() {},
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  const { token, setToken } = useToken();
  const [decodedToken, setDecodedToken] =
    useState<DecodedTokenPayload<UserPayload> | null>(null);

  useEffect(() => {
    if (token != null) {
      const decodedToken = decodeToken<UserPayload>(token);
      setDecodedToken(decodedToken);
    }
  }, [token]);

  function signIn({ token }: { token: string | null }): void {
    setToken(token);
  }

  function signOut() {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, token, decodedToken }}>
      {children}
    </AuthContext.Provider>
  );
}
