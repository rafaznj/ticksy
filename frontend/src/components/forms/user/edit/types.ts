import type { UserRoleEnum } from "@/modules/user/enums/user-role.enum";

export interface EditUserFormProps {
  name?: string;
  email?: string;
  role?: UserRoleEnum;
}
