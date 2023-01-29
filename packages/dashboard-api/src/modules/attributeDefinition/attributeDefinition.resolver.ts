import { Ctx, Query, Resolver } from "type-graphql";
import { ResolverContext } from "../../lib/graphql";
import {
  AttributeDefinition,
  AttributeDefinitionModel,
} from "./attributeDefinition.model";

@Resolver(AttributeDefinition)
export class AttributeDefinitionResolver {
  @Query(() => [AttributeDefinition])
  async attributeDefinitions(
    @Ctx() { user: { companyId } }: ResolverContext
  ): Promise<AttributeDefinition[]> {
    return AttributeDefinitionModel.find({ companyId }).exec();
  }
}
