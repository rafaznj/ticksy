import { UserModel } from "../../models/user-model";

export interface IGetUserByEmailService {
  execute(email: string): Promise<UserModel | null>;
}
