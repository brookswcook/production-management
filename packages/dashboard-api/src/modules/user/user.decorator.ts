import { createParamDecorator } from "type-graphql";
import { ResolverContext } from "../../lib/graphql";
import { getLoader } from "../../lib/graphqlLoader";
import { Company } from "../company/company.model";

async function getTenantId(context: ResolverContext): Promise<string> {
  const {
    user: { role, companyId: userCompanyId },
  } = context;
  if (role === "Admin" || role === "VChapman") return userCompanyId;
  else if (role === "Factory") {
    const companyByIdLoader = getLoader<string, Company>(
      "companyByIdLoader",
      context
    );
    const { companyId } = await companyByIdLoader.load(userCompanyId);
    return companyId;
  } else throw Error("Unknown user role");
}

export function TenantId() {
  return createParamDecorator<ResolverContext>(async ({ context }) =>
    getTenantId(context)
  );
}
