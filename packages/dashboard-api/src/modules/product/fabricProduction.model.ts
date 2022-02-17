import { Field, ObjectType } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";

@ObjectType()
export class FabricProduction {
  @Field()
  @Property()
  lastStartdate!: Date;

  @Field()
  @Property()
  sufficientFabric!: boolean;

  @Field()
  @Property()
  actualStartDate!: Date;
}
