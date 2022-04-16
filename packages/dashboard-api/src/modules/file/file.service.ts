import { FileUpload } from "graphql-upload";
import { extname } from "path";
import { upload } from "../../lib/s3";

export async function uploadFile(
  parentCode: string,
  type: "tech-pack" | "pattern",
  file: Promise<FileUpload>,
  contentLength: number
): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { filename, createReadStream } = await file;
  const extName = extname(filename);
  const fileName = `${type}-${parentCode}-${Date.now()}${extName}`;
  const content = createReadStream();
  return await upload({ fileName, content, contentLength });
}
