import { UserViewModel } from "../../user/view-models/user.vm";

export interface LoginViewModel {
  accessToken: string;
  refreshToken: string;
  user: UserViewModel | null;
}
