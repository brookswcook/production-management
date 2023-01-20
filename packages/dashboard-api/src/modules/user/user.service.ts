import { UserContactDetails, UserModel } from "./user.model";

export class UserService {
  getFactoryUserEmails(factoryCode: string): Promise<string[]> {
    const factoryRole = UserModel.buildFactoryRole(factoryCode);
    return UserModel.getUserEmails({ role: factoryRole });
  }

  getUserEmailsByCompany(companyCode: string): Promise<string[]> {
    return UserModel.getUserEmails({ companyCode });
  }

  getUserContactDetailsByCompany(
    companyCode: string
  ): Promise<UserContactDetails[]> {
    return UserModel.getUserContactDetails({
      companyCode,
    });
  }

  parseFactoryCodeRole(role: string) {
    return UserModel.parseFactoryCodeRole(role);
  }
}
