import { FileUpload } from "graphql-upload";

export interface IFileUpload {
  file: Promise<FileUpload>;
  fileSize: number;
}
