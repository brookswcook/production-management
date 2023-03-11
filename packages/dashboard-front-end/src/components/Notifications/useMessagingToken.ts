import { useState } from "react";
import { config } from "../../config";

export default function useMessagingToken(): {
  messagingToken: string | null;
  setMessagingToken: (token: string | null) => void;
} {
  const { nodeEnv } = config;
  const itemName =
    nodeEnv === "production"
      ? "pmt-messaging-token"
      : `pmt-messaging-token-${nodeEnv}`;

  function getToken() {
    return localStorage.getItem(itemName);
  }

  const [messagingToken, setMessagingToken] = useState<string | null>(
    getToken()
  );

  function saveToken(token: string | null) {
    if (token == null) {
      localStorage.removeItem(itemName);
    } else {
      localStorage.setItem(itemName, token);
    }
    setMessagingToken(token);
  }

  return { messagingToken, setMessagingToken: saveToken };
}
