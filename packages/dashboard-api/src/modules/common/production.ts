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
      if (this.started && this.actualStartDate) {
        return (
          this.lastStartDate.getTime() - this.actualStartDate.getTime() > 0
        );
      } else {
        return this.lastStartDate.getTime() - new Date().getTime() > 0;
      }
    },
  })
  onTime?: boolean;
}
