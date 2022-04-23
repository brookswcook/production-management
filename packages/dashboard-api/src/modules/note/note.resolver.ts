import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { uploadFile } from "../file/file.service";
import { CreateNoteInput } from "./note.input";
import { Note, NoteModel } from "./note.model";

@Resolver(Note)
export class NoteResolver {
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
}
