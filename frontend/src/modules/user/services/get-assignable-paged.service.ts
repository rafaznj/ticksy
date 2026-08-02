import { inject, injectable } from "inversify";
import { AppError } from "@/shared/errors/app-error";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";
import type { IGetAssignableUsersPagedService } from "@/modules/user/services/contracts/get-assignable-paged";
import type { UserEntity } from "@/modules/user/entity/user.entity";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { handleServiceResponse } from "@/shared/response/handle-service-response";

@injectable()
export class GetAssignableUsersPagedService implements IGetAssignableUsersPagedService {
  constructor(
    @inject(REPOSITORY_TOKENS.GetAssignableUsersPagedRepository)
    private readonly getAssignableUsersPagedRepository: IGetAssignableUsersPagedService,
  ) {}

  async execute(params: PagedParamsQuery): Promise<PagedResponse<UserEntity> | AppError> {
    const response = await this.getAssignableUsersPagedRepository.execute(params);

    return handleServiceResponse(response);
  }
}
