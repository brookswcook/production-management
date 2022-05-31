import { UserRole } from "./types";

export function authorizeByRole(userRole: UserRole, authorizedRoles: string[]) {
  if (authorizedRoles.length > 0) {
    return authorizedRoles.some(authRole =>
      new RegExp(`^${authRole}$`).test(userRole)
    );
  }
  return true;
}
