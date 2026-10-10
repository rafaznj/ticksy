import { IQueryOptions } from "../../../shared/interfaces/query-options";
import { UserRoleEnum } from "../enums/role.enum";

export interface IUserQueryOptions extends IQueryOptions {
  role?: UserRoleEnum;
}
