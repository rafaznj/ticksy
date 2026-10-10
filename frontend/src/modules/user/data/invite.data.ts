import type { UserRoleEnum } from "../enums/role.enum";

export interface InviteUserData {
  name: string;
  email: string;
  role: UserRoleEnum;
  password: string;
}
