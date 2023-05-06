import { UserRole } from "dashboard-core";
import { Service } from "typedi";
import { UserContactDetails, UserModel } from "./user.model";

@Service()
export class UserService {
  getUserEmailsByCompany(companyId: string): Promise<string[]> {
    return UserModel.getUserEmails({ companyId });
  }

  getUserIdsByRoles(companyId: string, roles: UserRole[]): Promise<string[]> {
    return UserModel.getUserIds({ companyId, role: { $in: roles } });
  }

  getUserContactDetailsByCompany(
    companyId: string
  ): Promise<UserContactDetails[]> {
    return UserModel.getUserContactDetails({
      companyId,
    });
  }
}
