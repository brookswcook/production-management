import {
  getModelForClass,
  index,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { FileType } from "dashboard-core";
import { Field, ObjectType } from "type-graphql";
import { User } from "../user/user.model";

@ModelOptions({ schemaOptions: { timestamps: true } })
@index({ type: 1, parentId: 1 })
@ObjectType()
export class File extends TimeStamps {
  @Field()
  id!: string;

  @Field(() => String)
  @Property({ required: true })
  parentId!: string;

  @Field()
  @Property({ required: true })
  type!: FileType;

  @Field(() => String)
  @Property({ required: true })
  name!: string;

  @Field()
  @Property({ required: true })
  extName!: FileType;

  @Field(() => String)
  @Property({
    default(this: File): string {
      return `${this.type}_${this.parentId}_${this.id}${this.extName}`;
    },
    unique: true,
  })
  uploadingKey!: string;

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
}

export const FileModel = getModelForClass(File);
