import { createParamDecorator } from "type-graphql";
import { ResolverContext } from "../../lib/graphql";
import { getLoader } from "../../lib/graphqlLoader";
import { Company } from "../company/company.model";

export function TenantId() {
  return createParamDecorator<ResolverContext>(
    async ({
      context,
      context: {
        user: { role, companyId },
      },
    }) => {
      if (role === "Admin" || role === "VChapman") return companyId;
      else if (role === "Factory") {
        const companyByIdLoader = getLoader<string, Company>(
          "companyByIdLoader",
          context
        );
        const { parentId } = await companyByIdLoader.load(companyId);
        return parentId;
      } else throw Error("Unknown user role");
    }
  );
}
