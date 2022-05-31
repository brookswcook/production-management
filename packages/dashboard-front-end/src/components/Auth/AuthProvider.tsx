import { UserRole } from "dashboard-core";
import { createContext } from "react";
import useRole from "./useRole";
import useToken from "./useToken";

interface AuthContextType {
  token: string | null;
  role: UserRole | null;
  signIn: ({
    token,
    role,
  }: {
    token: string | null;
    role: UserRole | null;
  }) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  signIn() {},
  signOut() {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, setToken } = useToken();
  const { role, setRole } = useRole();

  function signIn({
    token,
    role,
  }: {
    token: string | null;
    role: UserRole | null;
  }) {
    setToken(token);
    setRole(role);
  }

  function signOut() {
    setToken(null);
    setRole(null);
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, token, role }}>
      {children}
    </AuthContext.Provider>
  );
}
