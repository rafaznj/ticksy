import { UserRoleEnum } from "../enums/role.enum";

export interface UserPagedDto {
  id: string;
  name: string;
  email: string;
  mustChangePassword: boolean;
  role: UserRoleEnum;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}
