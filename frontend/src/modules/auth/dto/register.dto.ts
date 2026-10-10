import type { UserDto } from "@/modules/user/dto/user.dto";

export interface RegisterDto {
  accessToken: string;
  user: UserDto;
}
