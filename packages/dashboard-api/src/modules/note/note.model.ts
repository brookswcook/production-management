import {
  getModelForClass,
  index,
  ModelOptions,
  prop as Property,
  ReturnModelType,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";
import { NoteType } from "dashboard-core";
import { User } from "../user/user.model";

@ModelOptions({ schemaOptions: { timestamps: true } })
@index({ type: 1, parentId: 1 })
@ObjectType()
export class Note extends TimeStamps {
  @Field()
  id?: string;

  @Field(() => String)
  @Property({ required: true })
  parentId!: string;

  // TODO: maybe note should not know about given types; create service with needed functions instead
  @Field()
  @Property({ required: true })
  type!: NoteType;

  @Field()
  @Property({ required: true })
  text!: string;

  @Field(() => [String])
  @Property({ type: () => [String], default: [] })
  imageFileNames?: string[];

  @Field(() => String)
  @Property({ required: true })
  userId!: string;

  @Field(() => User, { nullable: true })
  @Property({
    ref: () => User,
    foreignField: "_id",
    localField: "userId",
    justOne: true,
  })
  user!: User;

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
