import "dotenv/config";

export const {
  NODE_ENV = "development",
  PORT = 4000,
  LOG_LEVEL = "info",
  JWT_SECRET = "secret",
  JWT_EXPIRE = "7d",
  MONGO_URI = "localhost:27017",
  MONGO_DEBUG_MODE_ENABLED = false,
  S3_REGION = "us-east-1",
  S3_ENDPOINT = "https://sfo3.digitaloceanspaces.com/",
  S3_BUCKET_NAME = "production-management",
  S3_ACCESS_KEY_ID = "",
  S3_SECRET_ACCESS_KEY = "",
} = process.env;
