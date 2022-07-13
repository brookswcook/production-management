import { FileUpload } from "graphql-upload";
import { extname } from "path";
import { getDownloadLink, upload } from "../../lib/s3";
import { FileType, IFileUpload } from "./file.types";

export async function uploadFile(
  parentCode: string,
  type: FileType,
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

export async function uploadFiles(
  parentCode: string,
  type: FileType,
  fileUploadInputs: IFileUpload[]
) {
  const fileNames = [];
  for await (const fileUploadInput of fileUploadInputs) {
    const { file, fileSize } = fileUploadInput;
    const uploadedFileName = await uploadFile(parentCode, type, file, fileSize);
    fileNames.push(uploadedFileName);
  }
  return fileNames;
}

// TODO: added for future needs to deal with file folders and etc
export function getDownloadFileLink(fileName: string): Promise<string> {
  return getDownloadLink({ fileName });
}
