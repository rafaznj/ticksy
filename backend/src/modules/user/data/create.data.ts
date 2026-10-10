import { UserRoleEnum } from "../enums/role.enum";

export interface CreateUserData {
  name: string;
  email: string;
  role: UserRoleEnum;
  password: string;
  mustChangePassword?: boolean;
}
