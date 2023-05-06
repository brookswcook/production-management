import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { ResolverContext } from "../../lib/graphql";
import { getDownloadFileLink, uploadFiles } from "../file/file.service";
import { TenantId } from "../user/user.decorator";
import { CreateNoteInput, GetNotesInput } from "./note.input";
import { Note, NoteModel } from "./note.model";

@Service()
@Resolver(Note)
export class NoteResolver {
  @Authorized()
  @Query(() => [Note])
  async notes(
    @TenantId() companyId: string,
    @Arg("data") { entityId: parentId, type }: GetNotesInput
  ): Promise<Note[]> {
    return NoteModel.find({ companyId, parentId, type })
      .sort({ _id: -1 })
      .populate("user")
      .exec();
  }

  @Authorized()
  @Mutation(() => Note)
  async createNote(
    @TenantId() companyId: string,
    @Arg("data") data: CreateNoteInput,
    @Ctx() { user: { id: userId } }: ResolverContext
  ): Promise<Note> {
    const noteData = data as unknown as Omit<Note, "companyId">;
    if (data.images.length > 0) {
      noteData.imageFileNames = await uploadFiles(
        data.parentId,
        userId,
        "note-image",
        data.images
      );
    }
    noteData.userId = userId;
    return new NoteModel({ companyId, ...noteData }).save();
  }

  // TODO: support multitenancy in s3
  @Authorized()
  @Query(() => String)
  imageLink(@Arg("fileName") fileName: string): Promise<string> {
    return getDownloadFileLink(fileName);
  }
}
