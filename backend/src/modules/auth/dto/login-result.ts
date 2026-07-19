import { UserModel } from "../../user/entity/user-model";

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
}
