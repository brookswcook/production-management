import { authorizeByRole, UserRole } from "dashboard-core";
import { Fragment, ReactElement, useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function RequireRole({
  authorizedRoles,
  children,
}: {
  authorizedRoles: UserRole[];
  children: ReactElement;
}): ReactElement {
  const { decodedToken } = useContext(AuthContext);
  return decodedToken?.role != null &&
    authorizeByRole(decodedToken.role, authorizedRoles) ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Fragment />
  );
}
