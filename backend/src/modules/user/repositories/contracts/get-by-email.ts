import { UserViewModel } from "../../view-models/user.vm";

export interface IGetUserByEmailRepository {
  execute(email: string): Promise<UserViewModel | null>;
}
