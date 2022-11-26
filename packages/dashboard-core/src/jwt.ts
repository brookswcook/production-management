import { sign, decode } from "jsonwebtoken";

export function decodeToken<T>(token: string): T | null {
  const result = decode(token, { json: true });
  if (result == null) return null;
  return result as T;
}

export function signToken<T extends object>(
  payload: T,
  secret: string,
  expiresIn: string
) {
  return sign(payload, secret, { expiresIn });
}
