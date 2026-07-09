import { UserRoleEnum } from "../enums/roles.enum";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
}
