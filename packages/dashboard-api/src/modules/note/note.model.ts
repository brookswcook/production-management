import {
  getModelForClass,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";

@ModelOptions({ schemaOptions: { timestamps: true } })
@ObjectType()
export class Note extends TimeStamps {
  @Field(() => String)
  @Property()
  parentId!: string;

  // TODO: maybe note should not know about given types; create service with needed functions instead
  @Field()
  @Property()
  type!: "sampleRejectionComment" | "productNote";

  @Field()
  @Property()
  text!: string;

  // @Field()
  // @Property()
  // images!: string[];

  //TODO: decide
  @Field(() => String, { nullable: true })
  @Property()
  user?: string;
}

export const NoteModel = getModelForClass(Note);
