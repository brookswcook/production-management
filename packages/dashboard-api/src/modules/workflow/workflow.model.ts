import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
class WorkflowStage {
  @Field()
  @Property()
  duration!: number;
}

@ObjectType()
export class Workflow {
  @Field(() => WorkflowStage)
  @Property({ _id: false })
  shipping!: WorkflowStage;

  @Field(() => WorkflowStage)
  @Property({ _id: false })
  qualityControl!: WorkflowStage;

  @Field(() => WorkflowStage)
  @Property({ _id: false })
  production!: WorkflowStage;

  @Field(() => WorkflowStage)
  @Property({ _id: false })
  fabricProduction!: WorkflowStage;
}

export const WorkflowModel = getModelForClass(Workflow);
