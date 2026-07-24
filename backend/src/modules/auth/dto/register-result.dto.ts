import { UserModel } from "../../user/models/user-model";

export interface RegisterResult {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
}
