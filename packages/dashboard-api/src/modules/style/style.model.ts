import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { FileType } from "dashboard-core";
import { Field, ObjectType } from "type-graphql";
import { ExpectResultModel } from "../common/expectResultModel";
import { IMultiTenant, ISlug } from "../common/types";
import { File } from "../file/file.model";

@ObjectType()
export class Style extends ExpectResultModel implements IMultiTenant, ISlug {
  @Field()
  id!: string;

  @Property({ required: true })
  companyId!: string;

  @Field()
  @Property({ required: true, unique: true })
  code!: string;

  @Field()
  @Property({ required: true })
  name!: string;

  @Field(() => [File])
  @Property({
    ref: () => File,
    foreignField: "parentId" as Partial<File>,
    localField: "_id",
    match: { type: "tech-pack" as FileType } as Partial<File>,
    options: { sort: { _id: -1 } },
  })
  techPacks?: File[];

  @Field({ nullable: false })
  @Property({
    get(this: Style) {
      if (this.techPacks == null) return false;
      return this.techPacks?.length > 0;
    },
  })
  techPackUploaded?: boolean;
}

export const StyleModel = getModelForClass(Style);
