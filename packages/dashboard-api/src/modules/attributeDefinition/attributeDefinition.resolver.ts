import { Arg, Query, Resolver } from "type-graphql";
import { TenantId } from "../user/user.decorator";
import {
  AttributeDefinition,
  AttributeDefinitionModel,
} from "./attributeDefinition.model";

@Resolver(AttributeDefinition)
export class AttributeDefinitionResolver {
  @Query(() => [AttributeDefinition])
  async attributeDefinitions(
    @TenantId() companyId: string
  ): Promise<AttributeDefinition[]> {
    return AttributeDefinitionModel.find({ companyId }).exec();
  }

  @Query(() => [AttributeDefinition])
  async attributeDefinition(
    @TenantId() companyId: string,
    @Arg("name") name: string
  ): Promise<AttributeDefinition[]> {
    return AttributeDefinitionModel.find({ companyId, name }).exec();
  }
}
