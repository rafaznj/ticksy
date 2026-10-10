import { UserRoleEnum } from "../enums/role.enum";

export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  deleted: boolean;
  mustChangePassword: boolean;
  createdAt: Date;
  updatedAt: Date;
}
