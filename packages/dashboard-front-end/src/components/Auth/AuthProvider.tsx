import { createContext } from "react";
import useToken from "./useToken";

interface AuthContextType {
  token: string | null;
  signIn: (token: string | null) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, setToken } = useToken();

  function signIn(token: string | null) {
    setToken(token);
  }

  function signOut() {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, token }}>
      {children}
    </AuthContext.Provider>
  );
}
