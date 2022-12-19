import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ResolverContext } from "../../lib/graphql";
import { getDownloadFileLink, uploadFiles } from "../file/file.service";
import { CreateNoteInput } from "./note.input";
import { Note, NoteModel } from "./note.model";

@Resolver(Note)
export class NoteResolver {
  @Authorized()
  @Mutation(() => Note)
  async createNote(
    @Arg("data") data: CreateNoteInput,
    @Ctx() { user: { id: userId } }: ResolverContext
  ): Promise<Note> {
    const noteData = data as unknown as Note;
    if (data.images.length > 0) {
      noteData.imageFileNames = await uploadFiles(
        data.parentId,
        userId,
        "note-image",
        data.images
      );
    }
    noteData.userId = userId;
    return new NoteModel(noteData).save();
  }

  @Authorized()
  @Query(() => String)
  imageLink(@Arg("fileName") fileName: string): Promise<string> {
    return getDownloadFileLink(fileName);
  }
}
