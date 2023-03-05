import {
  getModelForClass,
  index,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";
import { User } from "../user/user.model";

@index<Company>({ parentId: 1, code: 1 }, { unique: true })
@ModelOptions({ schemaOptions: { timestamps: true } })
@ObjectType()
export class Company implements TimeStamps {
  @Field()
  id!: string;

  @Property({
    required: true,
    default(this: Company): string {
      if (this.parentId == null)
        throw Error("Non root company doesn't have parentId!");
      return this.isRoot ? this.id : this.parentId;
    },
  })
  companyId!: string;

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
  @Property({ default: null })
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

  @Field(() => [User])
  @Property({
    ref: () => User,
    foreignField: "companyId",
    localField: "_id",
  })
  users!: User[];

  @Field(() => [User])
  @Property({
    ref: () => User,
    foreignField: "companyId",
    localField: "_id",
    match: { pointOfContact: true },
  })
  contacts!: User[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  static async getChildCompanies(companyId: string): Promise<Company[]> {
    return CompanyModel.find({ parentId: companyId }).exec();
  }
}

export const CompanyModel = getModelForClass(Company);
