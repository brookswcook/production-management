import { useState } from "react";
import { config } from "../../config";

// TODO: Use refreshToken
// TODO: Use refreshToken rotation and refresh token reuse detection
// TODO: consider using httpOnly cookie session to avoid possible XSS attack on session storage
export default function useToken(): {
  token: string | null;
  setToken: (token: string | null) => void;
} {
  const { nodeEnv } = config;
  const itemName =
    nodeEnv === "production" ? "pmt-auth-token" : `pmt-auth-token-${nodeEnv}`;
  function getToken() {
    return localStorage.getItem(itemName);
  }

  const [token, setToken] = useState<string | null>(getToken());

  function saveToken(token: string | null) {
    if (token == null) {
      localStorage.removeItem(itemName);
    } else {
      localStorage.setItem(itemName, token);
    }
    setToken(token);
  }

  return { token, setToken: saveToken };
}
