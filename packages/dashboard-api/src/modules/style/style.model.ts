import {
  getModelForClass,
  prop as Property,
  ReturnModelType,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Style {
  @Field()
  @Property({ required: true, unique: true })
  code!: string;

  @Field()
  @Property({ required: true })
  name!: string;

  @Field(() => [String])
  @Property({ default: [] })
  techPackFileNames?: string[];

  @Field({ nullable: true })
  @Property({
    get(this: Style) {
      return this.techPackFileNames!.length > 0;
    },
  })
  techPackUploaded?: boolean;

  static async findOneAndUpdateOrFail(
    this: ReturnModelType<typeof Style>,
    query: Partial<Style>,
    update: Partial<Style>
  ): Promise<Style> {
    const updatedStyle = await this.findOneAndUpdate(
      query,
      { $set: update },
      { returnOriginal: false }
    ).exec();
    if (updatedStyle == null) throw Error(`Style is not found`);
    return updatedStyle;
  }
}

export const StyleModel = getModelForClass(Style);
