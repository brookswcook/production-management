import { prop as Property } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType({ isAbstract: true })
export class Production {
  @Field({ nullable: false })
  @Property()
  lastStartDate!: Date;

  @Field({ nullable: true })
  @Property({ default: false })
  started?: boolean;

  @Field({ nullable: true })
  @Property()
  actualStartDate?: Date;

  @Field({ nullable: true })
  @Property({
    get(this: Production) {
      return Boolean(
        this.started || new Date().getTime() - this.lastStartDate.getTime() > 0
      );
    },
  })
  onTime?: boolean;
}
