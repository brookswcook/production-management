import { prop as Property } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Sample {
  @Field()
  @Property()
  sku!: string;

  @Field({ nullable: true })
  @Property({ default: false })
  approved?: boolean;

  @Field()
  @Property()
  trackNumber!: string;

  @Field({ nullable: true })
  @Property({ default: false })
  delivered?: boolean;
}
