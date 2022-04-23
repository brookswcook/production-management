import { FileUpload } from "graphql-upload";
import { extname } from "path";
import { getDownloadLink, upload } from "../../lib/s3";

export async function uploadFile(
  parentCode: string,
  type: "tech-pack" | "print" | "note-image",
  file: Promise<FileUpload>,
  contentLength: number
): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { filename, createReadStream } = await file;
  const extName = extname(filename);
  const fileName = `${type}_${parentCode}_${Date.now()}${extName}`;
  const content = createReadStream();
  return await upload({ fileName, content, contentLength });
}
// TODO: added for future needs to deal with file folders and etc
export function getDownloadFileLink(fileName: string): Promise<string> {
  return getDownloadLink({ fileName });
}
