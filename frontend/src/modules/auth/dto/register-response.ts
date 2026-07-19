import type { UserEntity } from "@/modules/user/entity/user.entity";

export interface RegisterResponse {
  accessToken: string;
  user: UserEntity;
}
