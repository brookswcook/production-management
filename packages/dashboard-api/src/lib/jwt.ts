import jwt from "express-jwt";
import config from "../config";
import { signToken, UserPayload } from "dashboard-core";

export const jwtAuth: jwt.Options = {
  secret: config.auth.jwtSecret,
  credentialsRequired: false,
  algorithms: ["HS256"],
};

export function signUserToken(payload: UserPayload) {
  const { jwtExpire, jwtSecret } = config.auth;
  return signToken<UserPayload>(payload, jwtSecret, jwtExpire);
}
