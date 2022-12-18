import { UserModel } from "./user.model";

export class UserService {
  getFactoryUserEmails(factoryCode: string): Promise<string[]> {
    const factoryRole = UserModel.buildFactoryRole(factoryCode);
    return UserModel.getUserEmails({ role: factoryRole });
  }
}
