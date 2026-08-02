import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { UserEntity } from "@/modules/user/entity/user.entity";
import type { IGetAssignableUsersPagedRepository } from "@/modules/user/repositories/contracts/get-assignable-paged";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/response/handle-repository-response";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";
import { inject, injectable } from "inversify";

@injectable()
export class GetAssignableUsersPagedRepository implements IGetAssignableUsersPagedRepository {
  private readonly basePath = "user";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private axiosSingleton: AxiosSingleton,
  ) {}

  async execute(params: PagedParamsQuery): Promise<PagedResponse<UserEntity> | AppError> {
    const response = await this.axiosSingleton.client.get<PagedResponse<UserEntity>>(
      `${this.basePath}/get-assignable`,
      { params },
    );

    return handleRepositoryResponse(response);
  }
}
