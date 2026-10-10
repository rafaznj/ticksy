import type { UserRoleEnum } from "@/modules/user/enums/role.enum";

export interface InviteUserFormProps {
  name: string;
  email: string;
  role: UserRoleEnum;
}
