import { CompanyModel } from "./company.model";

export class CompanyService {
  async getChildCompaniesIds(companyId: string) {
    const companies = await CompanyModel.getChildCompanies(companyId);
    return companies.map(company => String(company.id));
  }
}
