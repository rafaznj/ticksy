import type { UserRoleEnum } from "../../enums/role.enum";

export interface IGetUserIdsByRoleRepository {
  execute(role: UserRoleEnum): Promise<string[]>;
}
