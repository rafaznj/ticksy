import type { UserEntity } from "@/modules/user/entity/user.entity";
import type { AppError } from "@/shared/errors/app-error";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";

export interface IGetUserPagedService {
  execute(params: PagedParamsQuery): Promise<PagedResponse<UserEntity> | AppError>;
}
