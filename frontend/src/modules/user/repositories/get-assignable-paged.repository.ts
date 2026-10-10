import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { UserDto } from "@/modules/user/dto/user.dto";
import type { IGetAssignableUsersPagedRepository } from "@/modules/user/repositories/contracts/get-assignable-paged";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import type { PagedParamsQuery } from "@/components/tables/shared/interfaces/paged-params-query";
import type { PagedResponse } from "@/components/tables/shared/interfaces/paged-response";

import { inject, injectable } from "inversify";

@injectable()
export class GetAssignableUsersPagedRepository implements IGetAssignableUsersPagedRepository {
  private readonly basePath = "user";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private axiosSingleton: AxiosSingleton,
  ) {}

  async execute(params: PagedParamsQuery): Promise<APIResponse<PagedResponse<UserDto>> | AppError> {
    const response = await this.axiosSingleton.client.get<APIResponse<PagedResponse<UserDto>>>(
      `${this.basePath}/get-assignable`,
      { params },
    );

    return handleRepositoryResponse(response);
  }
}
