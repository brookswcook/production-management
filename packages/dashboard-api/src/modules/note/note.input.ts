import { Field, InputType } from "type-graphql";
import { FileUploadInput } from "../file/file.input";
import { NoteType } from "dashboard-core";

@InputType()
export class GetNotesInput {
  @Field(() => String)
  type!: NoteType;

  @Field(() => String)
  entityId!: string;
}

@InputType()
export class CreateNoteInput {
  @Field()
  parentId!: string;

  @Field()
  text!: string;

  @Field(() => [FileUploadInput], { nullable: true, defaultValue: [] })
  images!: FileUploadInput[];

  @Field()
  type!: NoteType;
}
