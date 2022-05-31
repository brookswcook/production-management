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
  const { role } = useContext(AuthContext);
  return role != null && authorizeByRole(role, authorizedRoles) ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Fragment />
  );
}
