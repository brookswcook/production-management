import { S3, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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

export async function upload({
  fileName,
  content: Body,
  contentLength: ContentLength,
}: {
  fileName: string;
  content: string | ReadStream;
  contentLength: number;
}): Promise<string> {
  try {
    await s3Client.send(
      new PutObjectCommand({ Bucket, Key: fileName, Body, ContentLength })
    );
    logger.info(`Successfully uploaded object: ${fileName}`);
    return fileName;
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export async function getDownloadLink({
  fileName: Key,
}: {
  fileName: string;
}): Promise<string> {
  try {
    const command = new GetObjectCommand({ Bucket, Key });
    const url = await getSignedUrl(s3Client, command);
    return url;
  } catch (err) {
    logger.error(err);
    throw err;
  }
}
