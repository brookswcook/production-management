import { UserRole } from "dashboard-core";
import { UserContactDetails, UserModel } from "./user.model";

export class UserService {
  getUserEmailsByCompany(companyId: string): Promise<string[]> {
    return UserModel.getUserEmails({ companyId });
  }

  getUserIdsByRole(companyId: string, role: UserRole): Promise<string[]> {
    return UserModel.getUserIds({ companyId, role });
  }

  getUserContactDetailsByCompany(
    companyId: string
  ): Promise<UserContactDetails[]> {
    return UserModel.getUserContactDetails({
      companyId,
    });
  }
}
