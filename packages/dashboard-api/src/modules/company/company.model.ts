import {
  getModelForClass,
  index,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";

// Note: it should be used as tenant entity
// TODO: Review all entities to support multitenancy by company
@index<Company>({ parentId: 1, code: 1 }, { unique: true })
@ModelOptions({ schemaOptions: { timestamps: true } })
@ObjectType()
export class Company implements TimeStamps {
  @Field()
  id!: string;

  @Field()
  @Property({
    required: true,
    index: true,
    default(this: Company): string {
      return this.name.replace(/\W/g, "_").toLowerCase();
    },
  })
  // Note: can be used as subdomain and s3Prefix
  code!: string;

  @Field()
  @Property({ required: true, minlength: 4, maxlength: 128 })
  name!: string;

  @Field()
  @Property({ required: true })
  address!: string;

  @Field({ nullable: true })
  @Property()
  parentId?: string;

  @Field()
  @Property({
    get(this: Company) {
      return this.parentId == null;
    },
  })
  isRoot!: boolean;

  @Field()
  @Property({ required: true, enum: ["Owner", "Factory"] })
  role!: "Owner" | "Factory";

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const CompanyModel = getModelForClass(Company);
