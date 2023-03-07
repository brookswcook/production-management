import "dotenv/config";
import { ServiceAccount } from "firebase-admin/lib/app";
import { S3ClientConfig } from "@aws-sdk/client-s3";

const {
  NODE_ENV: environment = "development",
  PORT: port = 4000,
  MONGO_URI: mongoURI,
  MONGO_DEBUG_MODE_ENABLED: mongoDebugModeEnabled = false,

  S3_REGION: s3Region = "us-east-1",
  S3_ENDPOINT: s3Endpoint = "https://sfo3.digitaloceanspaces.com/",
  S3_BUCKET_NAME: s3BucketName = "production-management",
  S3_ACCESS_KEY_ID: s3AccessKeyID,
  S3_SECRET_ACCESS_KEY: s3SecretAccessKey,

  FIREBASE_API_KEY: firebaseApiKey,
  FIREBASE_PROJECT_ID: firebaseProjectId,
  FIREBASE_CLIENT_EMAIL: firebaseClientEmail,
  FIREBASE_PRIVATE_KEY: firebasePrivateKey,

  SENDGRID_API_KEY: sendgridApiKey,

  JWT_SECRET: jwtSecret,
  JWT_EXPIRE: jwtExpire,
  LOG_LEVEL: logLevel = LoggingLevel.info,
} = process.env;

if (
  jwtExpire == null ||
  jwtSecret == null ||
  mongoURI == null ||
  environment == null ||
  s3AccessKeyID == null ||
  s3SecretAccessKey == null ||
  firebaseApiKey == null ||
  firebaseProjectId == null ||
  firebaseClientEmail == null ||
  firebasePrivateKey == null ||
  sendgridApiKey == null
) {
  throw new Error("One of the required env variables was not provided");
}

const config: ApiConfig = {
  port: Number(port),
  environment: environment as EnvironmentType,
  db: {
    uri: mongoURI,
    debugModeEnabled: mongoDebugModeEnabled === "true",
  },
  auth: {
    jwtExpire,
    jwtSecret,
    firebase: {
      apiKey: firebaseApiKey,
      serviceAccount: {
        clientEmail: firebaseClientEmail,
        privateKey: Buffer.from(firebasePrivateKey, "base64").toString("ascii"),
        projectId: firebaseProjectId,
      },
    },
  },
  s3: {
    client: {
      endpoint: s3Endpoint,
      region: s3Region,
      credentials: {
        accessKeyId: s3AccessKeyID,
        secretAccessKey: s3SecretAccessKey,
      },
    },
    bucketName: s3BucketName,
  },
  sendgrid: {
    apiKey: sendgridApiKey,
  },
  logging: { level: logLevel as LoggingLevel },
};

export type FirebaseConfig = {
  apiKey: string;
  serviceAccount: ServiceAccount;
};

export type ApiAuthConfig = {
  jwtExpire: string;
  jwtSecret: string;
  firebase: FirebaseConfig;
};

export declare enum LoggingLevel {
  error = "error",
  warn = "warn",
  info = "info",
  debug = "debug",
}

export declare type LoggingConfig = {
  //serviceName: string;
  level?: LoggingLevel;
  isProduction?: boolean;
};

export type ApiLoggingConfig = LoggingConfig;

export type EnvironmentType =
  | "production"
  | "staging"
  | "testing"
  | "development";

export type DBConfig = {
  uri: string;
  debugModeEnabled: boolean;
};

export type ApiConfig = {
  db: DBConfig;
  auth: ApiAuthConfig;
  logging: ApiLoggingConfig;
  environment: EnvironmentType;
  port: number;
  s3: S3Config;
  sendgrid: SendgridConfig;
};

export type S3Config = {
  client: S3ClientConfig;
  bucketName: string;
};

export type SendgridConfig = {
  apiKey: string;
};

export default config;
