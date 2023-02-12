import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { TenantId } from "../user/user.decorator";
import { UserService } from "../user/user.service";
import { CreateCompanyInput } from "./company.input";
import { Company, CompanyModel } from "./company.model";

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly userService: UserService) {
    // TODO: use DI as typedi if it gets annoying
    this.userService = new UserService();
  }

  @Authorized(["Admin"])
  @Query(() => [Company], { nullable: false })
  async companies(): Promise<Company[]> {
    return CompanyModel.find().populate(["users", "contacts"]).exec();
  }

  @Authorized(["Admin"])
  @Query(() => [Company], { nullable: false })
  async factories(@TenantId() companyId: string): Promise<Company[]> {
    return CompanyModel.find({ companyId, role: "Factory" })
      .populate(["users", "contacts"])
      .exec();
  }

  @Authorized(["Admin"])
  @Mutation(() => Company)
  async createCompany(@Arg("data") data: CreateCompanyInput): Promise<Company> {
    const companyData = { ...data, role: "Owner" };
    return new CompanyModel(companyData).save();
  }

  @Authorized(["Admin"])
  @Mutation(() => Company)
  async createFactory(
    @Arg("data") data: CreateCompanyInput,
    @TenantId() parentId: string
  ): Promise<Company> {
    const factoryData = { ...data, role: "Factory", parentId };
    return new CompanyModel(factoryData).save();
  }
}
