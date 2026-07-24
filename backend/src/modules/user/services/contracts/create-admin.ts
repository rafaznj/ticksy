import { UserModel } from "../../models/user-model";

export interface ICreateAdminUserService {
  execute(): Promise<UserModel>;
}
