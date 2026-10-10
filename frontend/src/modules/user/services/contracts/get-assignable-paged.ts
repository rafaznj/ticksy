import type { UserDto } from "@/modules/user/dto/user.dto";
import type { AppError } from "@/shared/errors/app-error";
import type { PagedParamsQuery } from "@/components/tables/shared/interfaces/paged-params-query";
import type { PagedResponse } from "@/components/tables/shared/interfaces/paged-response";

export interface IGetAssignableUsersPagedService {
  execute(params: PagedParamsQuery): Promise<PagedResponse<UserDto> | AppError>;
}
