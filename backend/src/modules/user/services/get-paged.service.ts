import { Inject } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IGetUserPagedRepository } from "../repositories/contracts/get-paged";
import { IQueryOptions } from "../../../shared/interfaces/query-options";
import { IGetUserPagedService } from "./contracts/get-paged";
import { IPagedResult } from "../../../shared/interfaces/paged-result";
import { UserPagedViewModel } from "../view-models/user-paged.vm";

export class GetUserPagedService implements IGetUserPagedService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetUserPagedRepository)
    private getUserPagedRepository: IGetUserPagedRepository,
  ) {}

  async execute(options: IQueryOptions): Promise<IPagedResult<UserPagedViewModel>> {
    const response = await this.getUserPagedRepository.execute({
      ...options,
      columnsComparison: ["name", "email"],
      softDeleteFilter: false,
    });
    return response;
  }
}
