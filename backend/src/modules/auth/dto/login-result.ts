import { UserModel } from "../../user/models/user-model";

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: UserModel | null;
}
