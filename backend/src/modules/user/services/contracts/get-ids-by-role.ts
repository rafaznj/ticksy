import type { UserRoleEnum } from "../../enums/role.enum";

export interface IGetUserIdsByRoleService {
  execute(role: UserRoleEnum): Promise<string[]>;
}
