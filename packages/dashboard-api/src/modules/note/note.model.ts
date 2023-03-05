import {
  getModelForClass,
  index,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";
import { NoteType } from "dashboard-core";
import { User } from "../user/user.model";
import { ExpectResultModel } from "../common/expectResultModel";

@ModelOptions({ schemaOptions: { timestamps: true } })
@index({ type: 1, parentId: 1 })
@ObjectType()
export class Note extends ExpectResultModel implements TimeStamps {
  @Field()
  id!: string;

  @Property({ required: true })
  companyId!: string;

  @Field(() => String)
  @Property({ required: true })
  userId!: string;

  @Field(() => String)
  @Property({ required: true })
  parentId!: string;

  @Field()
  @Property({ required: true })
  text!: string;

  // TODO: maybe note should not know about given types; create service with needed functions instead
  // TODO: type field of actionLog seems like a better idea
  @Field()
  @Property({ required: true })
  type!: NoteType;

  // TODO: replace with attachments?
  @Field(() => [String])
  @Property({ type: () => [String], default: [] })
  imageFileNames?: string[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => User, { nullable: true })
  @Property({
    ref: () => User,
    foreignField: "_id",
    localField: "userId",
    justOne: true,
  })
  user!: User;
}

export const NoteModel = getModelForClass(Note);
