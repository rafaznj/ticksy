import type { AppError } from "@/shared/errors/app-error";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";
import type { UserEntity } from "../../entity/user.entity";

export interface IGetAssignableUsersPagedRepository {
  execute(params: PagedParamsQuery): Promise<PagedResponse<UserEntity> | AppError>;
}
