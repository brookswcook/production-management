import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import { ReadStream } from "fs";
import logger from "./logger";
import {
  S3_ACCESS_KEY_ID,
  S3_ENDPOINT,
  S3_REGION,
  S3_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME as Bucket,
} from "../config";

const s3Client = new S3({
  endpoint: S3_ENDPOINT,
  region: S3_REGION,
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
});

export const upload = async ({
  fileName: Key,
  content: Body,
  contentLength: ContentLength,
}: {
  fileName: string;
  content: string | ReadStream;
  contentLength: number;
}): Promise<string> => {
  try {
    await s3Client.send(
      new PutObjectCommand({ Bucket, Key, Body, ContentLength })
    );
    const filePath = `${Bucket}/${Key}`;
    logger.info(`Successfully uploaded object: ${filePath}`);
    return filePath;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};
