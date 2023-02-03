import jwt from "express-jwt";
import config from "../config";
import { sign } from "jsonwebtoken";
import { UserPayload } from "dashboard-core";

export const jwtAuth: jwt.Options = {
  secret: config.auth.jwtSecret,
  credentialsRequired: false,
  algorithms: ["HS256"],
};

export function signToken<T extends object>(
  payload: T,
  secret: string,
  expiresIn: string
) {
  return sign(payload, secret, { expiresIn });
}

export function signUserToken(payload: UserPayload) {
  const { jwtExpire, jwtSecret } = config.auth;
  return signToken<UserPayload>(payload, jwtSecret, jwtExpire);
}
