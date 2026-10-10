import type { UserDto } from "@/modules/user/dto/user.dto";

export interface LoginDto {
  accessToken: string;
  user: UserDto;
}
