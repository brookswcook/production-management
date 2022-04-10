import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { CreateFabricInput } from "./fabric.input";
import { Fabric, FabricModel } from "./fabric.model";

@Resolver(Fabric)
export class FabricResolver {
  @Authorized()
  @Query(() => [Fabric])
  async fabrics() {
    return FabricModel.find().populate("samples").exec();
  }

  @Authorized()
  @Mutation(() => Fabric)
  async createFabric(@Arg("data") { ...data }: CreateFabricInput) {
    return (
      await new FabricModel({
        ...data,
      }).save()
    ).populate("samples");
  }
}
