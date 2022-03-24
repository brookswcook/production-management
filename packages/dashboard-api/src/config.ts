import "dotenv/config";

export const {
  NODE_ENV = "development",
  PORT = 4000,
  LOG_LEVEL = "info",
  JWT_SECRET = "secret",
  JWT_EXPIRE = "7d",
  MONGO_URI = "localhost:27017",
  MONGO_DEBUG_MODE_ENABLED = false,
} = process.env;
