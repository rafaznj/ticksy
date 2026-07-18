import { UserModel } from "../../user/entity/user-model";

export interface RegisterResult {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
}
