import { UserViewModel } from "../../user/view-models/user.vm";

export interface RegisterViewModel {
  accessToken: string;
  refreshToken: string;
  user: UserViewModel;
}
