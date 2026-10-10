import type { AppError } from "@/shared/errors/app-error";

import type { UserDto } from "../../dto/user.dto";
import type { APIResponse } from "@/shared/interfaces/api-response";
import type { PagedParamsQuery } from "@/components/tables/shared/interfaces/paged-params-query";
import type { PagedResponse } from "@/components/tables/shared/interfaces/paged-response";

export interface IGetAssignableUsersPagedRepository {
  execute(params: PagedParamsQuery): Promise<APIResponse<PagedResponse<UserDto>> | AppError>;
}
