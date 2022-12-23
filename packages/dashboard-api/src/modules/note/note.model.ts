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

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

export const NoteModel = getModelForClass(Note);
