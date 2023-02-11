import { FileType } from "dashboard-core";
import { FileUpload } from "graphql-upload";
import { extname } from "path";
import { getDownloadLink, upload } from "../../lib/s3";
import { FileModel, File } from "./file.model";
import { IFileUpload } from "./file.types";

// TODO: add companyId
export async function uploadFile(
  parentId: string,
  userId: string,
  type: FileType,
  file: Promise<FileUpload>,
  contentLength: number
): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { filename: name, createReadStream } = await file;
  const extName = extname(name);
  const { uploadingKey: key } = await new FileModel({
    parentId,
    type,
    name,
    extName,
    userId,
  } as Partial<File>).save();
  const content = createReadStream();
  return await upload({ key, content, contentLength });
}

export async function uploadFiles(
  parentId: string,
  userId: string,
  type: FileType,
  fileUploadInputs: IFileUpload[]
) {
  const uploadingKeys = [];
  for await (const fileUploadInput of fileUploadInputs) {
    const { file, fileSize } = fileUploadInput;
    const uploadingKey = await uploadFile(
      parentId,
      userId,
      type,
      file,
      fileSize
    );
    uploadingKeys.push(uploadingKey);
  }
  return uploadingKeys;
}

// TODO: added for future needs to deal with file folders and etc
export function getDownloadFileLink(key: string): Promise<string> {
  return getDownloadLink({ key });
}

export async function getDownloadFileLinks(keys: string[]) {
  const fileLinks = [];
  for await (const key of keys) {
    const fileLink = await getDownloadLink({ key });
    fileLinks.push(fileLink);
  }
  return fileLinks;
}
