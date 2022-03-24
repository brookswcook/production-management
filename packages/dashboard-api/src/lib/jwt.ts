import jwt from "express-jwt";
import { JWT_SECRET, JWT_EXPIRE as expiresIn } from "../config";
import { sign } from "jsonwebtoken";

export const jwtAuth: jwt.Options = {
  secret: JWT_SECRET,
  credentialsRequired: false,
  algorithms: ["HS256"],
};

export function signUserToken(payload: UserTokenData) {
  return sign(payload, JWT_SECRET, { expiresIn });
}

type UserTokenData = {
  id: string;
};
