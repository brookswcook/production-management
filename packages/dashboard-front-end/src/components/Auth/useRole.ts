import { useState } from "react";

export default function useRole() {
  function getRole() {
    return sessionStorage.getItem("role");
  }

  const [role, setRole] = useState<string | null>(getRole());

  function saveRole(role: string | null) {
    if (role == null) {
      sessionStorage.removeItem("role");
    } else {
      sessionStorage.setItem("role", role);
    }
    setRole(role);
  }

  return { role, setRole: saveRole };
}
