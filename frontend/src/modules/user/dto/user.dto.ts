import { UserRoleEnum } from "../enums/role.enum";

export interface UserDto {
  id: string;
  name: string;
  email: string;
  password: string;
  mustChangePassword: boolean;
  role: UserRoleEnum;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}
