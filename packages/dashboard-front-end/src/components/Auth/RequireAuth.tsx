import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export default function RequireAuth({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  return token != null ? (
    <>{children}</>
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
}
