import { authorizeByRole } from "dashboard-core";
import { Fragment, ReactElement, useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function RequireRole({
  authorizedRoles,
  children,
}: {
  authorizedRoles: string[];
  children: ReactElement;
}) {
  const { decodedToken } = useContext(AuthContext);
  return decodedToken?.role != null &&
    authorizeByRole(decodedToken.role, authorizedRoles) ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Fragment />
  );
}
