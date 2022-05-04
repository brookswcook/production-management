import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getDownloadFileLink, uploadFile } from "../file/file.service";
import { CreateNoteInput } from "./note.input";
import { Note, NoteModel } from "./note.model";

@Resolver(Note)
export class NoteResolver {
  @FieldResolver(() => Date, { nullable: true })
  createdAt(@Root("_doc") note: Note) {
    return note.createdAt;
  }

  @Authorized()
  @Mutation(() => Note)
  async createNote(@Arg("data") data: CreateNoteInput): Promise<Note> {
    const noteData: Omit<Note, "images"> = data;
    if (data.images.length > 0) {
      const imageFileNames = [];
      for await (const image of data.images) {
        const { file, fileSize } = image;
        const uploadedImageFileName = await uploadFile(
          data.parentId,
          "note-image",
          file,
          fileSize
        );
        imageFileNames.push(uploadedImageFileName);
      }
      noteData.imageFileNames = imageFileNames;
    }
    return new NoteModel(noteData).save();
  }

  @Authorized()
  @Query(() => String)
  imageLink(@Arg("fileName") fileName: string): Promise<string> {
    return getDownloadFileLink(fileName);
  }
}
