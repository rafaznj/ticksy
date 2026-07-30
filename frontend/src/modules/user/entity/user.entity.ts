import { UserRoleEnum } from "../enums/role.enum";

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}
