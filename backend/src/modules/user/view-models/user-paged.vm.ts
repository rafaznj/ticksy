import { UserRoleEnum } from "../enums/role.enum";

export interface UserPagedViewModel {
  id: string;
  name: string;
  email: string;
  role: UserRoleEnum;
  deleted: boolean;
  mustChangePassword: boolean;
  createdAt: Date;
  updatedAt: Date;
}
