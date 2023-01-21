import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { ResolverContext } from "../../lib/graphql";
import { UserContactDetails } from "../user/user.model";
import { UserService } from "../user/user.service";
import { CreateCompanyInput } from "./company.input";
import { Company, CompanyModel } from "./company.model";

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly userService: UserService) {
    // TODO: use DI as typedi if it gets annoying
    this.userService = new UserService();
  }

  @FieldResolver(() => [String])
  async associatedUsers(@Root("_doc") { code }: Company): Promise<string[]> {
    // TODO: add loader to run query once
    return this.userService.getUserEmailsByCompany(code);
  }

  @FieldResolver(() => [UserContactDetails])
  async contacts(@Root("_doc") { id }: Company): Promise<UserContactDetails[]> {
    return this.userService.getUserContactDetailsByCompany(id);
  }

  @Authorized(["Admin"])
  @Query(() => [Company], { nullable: false })
  async companies(): Promise<Company[]> {
    return CompanyModel.find().exec();
  }

  @Authorized(["Admin"])
  @Query(() => [Company], { nullable: false })
  async factories(
    @Ctx() { user: { companyId: parentId } }: ResolverContext
  ): Promise<Company[]> {
    return CompanyModel.find({ parentId, role: "Factory" }).exec();
  }

  @Authorized(["Admin"])
  @Mutation(() => Company)
  async createCompany(@Arg("data") data: CreateCompanyInput): Promise<Company> {
    return new CompanyModel(data).save();
  }
}
