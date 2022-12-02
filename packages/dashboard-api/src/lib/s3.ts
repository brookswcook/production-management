import { S3, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ReadStream } from "fs-capacitor";
import logger from "./logger";
import config from "../config";

const s3Client = new S3(config.s3.client);

export async function upload({
  key,
  content: Body,
  contentLength: ContentLength,
}: {
  key: string;
  content: string | ReadStream;
  contentLength: number;
}): Promise<string> {
  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: config.s3.bucketName,
        Key: fileName,
        Body,
        ContentLength,
      })
    );
    logger.info(`Successfully uploaded object: ${key}`);
    return key;
  } catch (err) {
    logger.error(`s3 upload error: `, err);
    throw err;
  }
}

export async function getDownloadLink({
  key: Key,
}: {
  key: string;
}): Promise<string> {
  try {
    const command = new GetObjectCommand({ Bucket: config.s3.bucketName, Key });
    const url = await getSignedUrl(s3Client, command);
    return url;
  } catch (err) {
    logger.error(err);
    throw err;
  }
}
