import DataLoader from "dataloader";
import { Company, CompanyModel } from "./company.model";

export const companyByIdLoader = new DataLoader<string, Company>(
  async companyIds => {
    // TODO: replace with service to all specific companies find query
    const companies = await CompanyModel.find<Company>({
      _id: { $in: companyIds },
    }).exec();
    const companiesById = companies.reduce(
      (acc: { [k: string]: Company }, item) => {
        acc[item.id] = item;
        return acc;
      },
      {}
    );
    return companyIds.map(companyId => companiesById[companyId]);
  }
);

export const companyByCodeLoader = new DataLoader<string, Company>(
  async companyCodes => {
    const companies = await CompanyModel.find<Company>({
      code: { $in: companyCodes },
    }).exec();
    const companiesByCodes = companies.reduce(
      (acc: { [k: string]: Company }, item) => {
        acc[item.code] = item;
        return acc;
      },
      {}
    );
    return companyCodes.map(companyCode => companiesByCodes[companyCode]);
  }
);
