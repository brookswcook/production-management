import { prop as Property } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

// It's used as embedded document of product so there's no need to get a model through getModelForClass
// otherwise typegoose will create dedicated collection which is not needed
@ObjectType()
export class TechPack {
  @Field()
  @Property()
  fabricCode!: string;

  @Field({ nullable: true })
  @Property({
    get(this: TechPack) {
      if (this.print != null) return "print";
      else if (this.pantone != null) return "pantone";
      return null;
    },
  })
  type?: string;

  @Field({ nullable: true })
  @Property()
  print?: string;

  @Field({ nullable: true })
  @Property()
  pantone?: string;

  @Field({ nullable: true })
  @Property()
  color?: string;
}
