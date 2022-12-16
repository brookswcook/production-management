import { sign, decode } from "jsonwebtoken";
import { DecodedTokenPayload } from "./types";

export function decodeToken<T>(token: string): DecodedTokenPayload<T> | null {
  const result = decode(token, { json: true });
  if (result == null) return null;
  return result as DecodedTokenPayload<T>;
}

export function signToken<T extends object>(
  payload: T,
  secret: string,
  expiresIn: string
) {
  return sign(payload, secret, { expiresIn });
}
