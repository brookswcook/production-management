import { UserContactDetails, UserModel } from "./user.model";

export class UserService {
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
}
