import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { CreateStyleInput } from "./style.input";
import { Style, StyleModel } from "./style.model";

@Resolver(Style)
export class StyleResolver {
  @Authorized()
  @Query(() => [Style])
  async styles() {
    return StyleModel.find().exec();
  }

  @Authorized()
  @Mutation(() => Style)
  async createStyle(@Arg("data") { ...data }: CreateStyleInput) {
    return await new StyleModel({
      ...data,
    }).save();
  }
}
