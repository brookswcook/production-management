import { UserContactDetails, UserModel } from "./user.model";

export class UserService {
  getFactoryUserEmails(factoryCode: string): Promise<string[]> {
    const factoryRole = UserModel.buildFactoryRole(factoryCode);
    return UserModel.getUserEmails({ role: factoryRole });
  }

  getUserEmailsByCompany(companyId: string): Promise<string[]> {
    return UserModel.getUserEmails({ companyId });
  }

  getUserContactDetailsByCompany(
    companyId: string
  ): Promise<UserContactDetails[]> {
    return UserModel.getUserContactDetails({
      companyId,
    });
  }

  parseFactoryCodeRole(role: string) {
    return UserModel.parseFactoryCodeRole(role);
  }
}
