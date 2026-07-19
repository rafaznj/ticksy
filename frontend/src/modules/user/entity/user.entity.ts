import { UserRoleEnum } from "../enums/roles.enum";

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
