import type { UserEntity } from "@/modules/user/entity/user.entity";

export interface LoginResponse {
  accessToken: string;
  user: UserEntity;
}
