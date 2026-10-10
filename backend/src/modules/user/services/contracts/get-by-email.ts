import { UserViewModel } from "../../view-models/user.vm";

export interface IGetUserByEmailService {
  execute(email: string): Promise<UserViewModel | null>;
}
