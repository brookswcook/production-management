import { sign, decode } from "jsonwebtoken";
import { DecodedTokenPayload } from "./types";

export function decodeToken<T>(token: string): DecodedTokenPayload<T> | null {
  return decode(token, { json: true }) as DecodedTokenPayload<T>;
}

export function signToken<T extends object>(
  payload: T,
  secret: string,
  expiresIn: string
) {
  return sign(payload, secret, { expiresIn });
}
