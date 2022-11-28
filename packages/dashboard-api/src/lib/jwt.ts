import jwt from "express-jwt";
import { JWT_SECRET, JWT_EXPIRE as expiresIn } from "../config";
import { signToken, UserPayload } from "dashboard-core";

export const jwtAuth: jwt.Options = {
  secret: JWT_SECRET,
  credentialsRequired: false,
  algorithms: ["HS256"],
};

export function signUserToken(payload: UserPayload) {
  return signToken<UserPayload>(payload, JWT_SECRET, expiresIn);
}
