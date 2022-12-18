import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { UserService } from "../user/user.service";
import { CreateFactoryInput } from "./factory.input";
import { Factory, FactoryModel } from "./factory.model";

@Resolver(() => Factory)
export class FactoryResolver {
  constructor(private readonly userService: UserService) {
    // TODO: use DI as typedi if it gets annoying
    this.userService = new UserService();
  }

  @FieldResolver(() => [String])
  async associatedUsers(@Root("_doc") { code }: Factory): Promise<string[]> {
    // TODO: add loader to run query once
    return this.userService.getFactoryUserEmails(code);
  }

  @Authorized(["Admin"])
  @Query(() => [Factory], { nullable: false })
  async factories(): Promise<Factory[]> {
    return FactoryModel.find().exec();
  }

  @Authorized(["Admin"])
  @Mutation(() => Factory)
  async createFactory(@Arg("data") data: CreateFactoryInput): Promise<Factory> {
    return new FactoryModel(data).save();
  }
}
