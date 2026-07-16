import type { User } from "@/modules/user/entity/user.entity";

export interface LoginResponse {
  accessToken: string;
  user: User;
}
