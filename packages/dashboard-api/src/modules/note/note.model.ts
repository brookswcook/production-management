import {
  getModelForClass,
  index,
  ModelOptions,
  prop as Property,
  ReturnModelType,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";

@ModelOptions({ schemaOptions: { timestamps: true } })
@index({ type: 1, parentId: 1 })
@ObjectType()
export class Note extends TimeStamps {
  @Field(() => String)
  @Property({ required: true })
  parentId!: string;

  // TODO: maybe note should not know about given types; create service with needed functions instead
  @Field()
  @Property({ required: true })
  type!: "sampleRejectionComment" | "productNote";

  @Field()
  @Property({ required: true })
  text!: string;

  @Field(() => [String])
  @Property({ default: [] })
  imageFileNames!: string[];

  //TODO: decide
  @Field(() => String, { nullable: true })
  @Property()
  user?: string;

  static async findOneAndUpdateOrFail(
    this: ReturnModelType<typeof Note>,
    query: Partial<Note>,
    update: Partial<Note>
  ): Promise<Note> {
    const updatedNote = await this.findOneAndUpdate(
      query,
      { $set: update },
      { returnOriginal: false }
    ).exec();
    if (updatedNote == null) throw Error(`Note is not found`);
    return updatedNote;
  }
}

export const NoteModel = getModelForClass(Note);
