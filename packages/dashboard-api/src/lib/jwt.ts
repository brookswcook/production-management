import jwt from "express-jwt";
import { JWT_SECRET } from "../config";

export const jwtAuth: jwt.Options = {
  secret: JWT_SECRET,
  credentialsRequired: false,
  algorithms: ["HS256"],
};
