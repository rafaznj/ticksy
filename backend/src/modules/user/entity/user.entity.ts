import { UserRoleEnum } from "../enums/roles.enum";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  createdAt: Date;
  updatedAt: Date;
}
