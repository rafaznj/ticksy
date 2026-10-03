import type { UserRoleEnum } from "@/modules/user/enums/role.enum";

export interface CreateUserFormProps {
  name: string;
  email: string;
  role: UserRoleEnum;
}
