import {
  getModelForClass,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";

// Note: it should be used as tenant entity
// TODO: Review all entities to support multitenancy by company
@ModelOptions({ schemaOptions: { timestamps: true } })
@ObjectType()
export class Company implements TimeStamps {
  @Field()
  @Property({
    required: true,
    unique: true,
    default(this: Company): string {
      return this.name.replace(/\W/g, "").toLowerCase();
    },
  })
  // Note: can be used as subdomain and s3Prefix
  code!: string;

  @Field()
  @Property({ required: true })
  name!: string;

  @Field()
  @Property({ required: true })
  address!: string;

  @Field()
  @Property({ required: true })
  createdAt!: Date;

  @Field()
  @Property({ required: true })
  updatedAt!: Date;
}

export const CompanyModel = getModelForClass(Company);
