import { Field, ObjectType } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";
import { Production } from "../common/production";

@ObjectType()
export class FabricProduction extends Production {
  @Field({ nullable: true })
  @Property()
  sufficientFabric?: boolean;
}
