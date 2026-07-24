import { UserModel } from "../../models/user-model";

export interface IGetUserByEmailRepository {
  execute(email: string): Promise<UserModel | null>;
}
