import { Field, ObjectType } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";

@ObjectType()
export class ProductProduction {
  @Field({ nullable: false })
  @Property()
  lastStartdate?: Date;

  @Field({ nullable: true })
  @Property({ default: false })
  started?: boolean;

  @Field({ nullable: true })
  @Property()
  actualStartDate?: Date;
}
