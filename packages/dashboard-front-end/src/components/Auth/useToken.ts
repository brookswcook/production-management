import { useState } from "react";

// TODO: Use refreshToken
// TODO: Use refreshToken rotation and refresh token reuse detection
// TODO: consider using httpOnly cookie session to avoid possible XSS attack on session storage
export default function useToken() {
  function getToken() {
    return sessionStorage.getItem("token");
  }

  const [token, setToken] = useState<string | null>(getToken());

  function saveToken(token: string | null) {
    if (token == null) {
      sessionStorage.removeItem("token");
    } else {
      sessionStorage.setItem("token", token);
    }
    setToken(token);
  }

  return { token, setToken: saveToken };
}
