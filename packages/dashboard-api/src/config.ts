import "dotenv/config";

export const {
  NODE_ENV = "development",
  PORT = 4000,
  LOG_LEVEL = "info",
  JWT_SECRET = "secret",
} = process.env;
