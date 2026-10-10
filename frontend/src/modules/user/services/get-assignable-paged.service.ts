import { inject, injectable } from "inversify";
import { AppError } from "@/shared/errors/app-error";

import type { IGetAssignableUsersPagedService } from "@/modules/user/services/contracts/get-assignable-paged";
import type { UserDto } from "@/modules/user/dto/user.dto";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { handleServiceResponse } from "@/shared/interfaces/handle-service-response";
import type { IGetAssignableUsersPagedRepository } from "@/modules/user/repositories/contracts/get-assignable-paged";
import type { PagedParamsQuery } from "@/components/tables/shared/interfaces/paged-params-query";
import type { PagedResponse } from "@/components/tables/shared/interfaces/paged-response";

@injectable()
export class GetAssignableUsersPagedService implements IGetAssignableUsersPagedService {
  constructor(
    @inject(REPOSITORY_TOKENS.GetAssignableUsersPagedRepository)
    private readonly getAssignableUsersPagedRepository: IGetAssignableUsersPagedRepository,
  ) {}

  async execute(params: PagedParamsQuery): Promise<PagedResponse<UserDto> | AppError> {
    const response = await this.getAssignableUsersPagedRepository.execute(params);

    return handleServiceResponse(response);
  }
}
