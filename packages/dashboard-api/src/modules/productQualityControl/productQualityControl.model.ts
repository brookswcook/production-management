import { Field, ObjectType } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";

@ObjectType()
export class ProductQualityControl {
  @Field({ nullable: false })
  @Property()
  lastVisitDate?: Date;

  @Field()
  @Property()
  scheduledVisitDate?: Date;

  @Field()
  @Property({ default: false })
  visited?: boolean;

  @Field()
  @Property()
  passed?: boolean;

  @Field(() => [String], { nullable: true })
  @Property({ type: () => [String], default: [] })
  notes?: string[];
}
