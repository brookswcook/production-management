import { UserRole } from "dashboard-core";
import { useState } from "react";

export default function useRole() {
  function getRole() {
    return sessionStorage.getItem("role") as UserRole;
  }

  const [role, setRole] = useState<UserRole | null>(getRole());

  function saveRole(role: UserRole | null) {
    if (role == null) {
      sessionStorage.removeItem("role");
    } else {
      sessionStorage.setItem("role", role);
    }
    setRole(role);
  }

  return { role, setRole: saveRole };
}
