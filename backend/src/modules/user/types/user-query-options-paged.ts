import { IQueryOptions } from "../../../shared/types/query-options";
import { UserRoleEnum } from "../enums/roles.enum";

export interface IUserQueryOptions extends IQueryOptions {
  role?: UserRoleEnum;
}
