import { UserRoleEnum } from "../enums/role.enum";

export interface UserModel {
  name: string;
  id: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
