import { Inject } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IGetUserPagedRepository } from "../repositories/contracts/get-paged";
import { IQueryOptions } from "../../../shared/types/query-options";
import { IPagedResult } from "../../../shared/types/paged-result";
import { UserModel } from "../models/user-model";
import { IGetUserPagedService } from "./contracts/get-paged";

export class GetUserPagedService implements IGetUserPagedService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetUserPagedRepository)
    private getUserPagedRepository: IGetUserPagedRepository,
  ) {}

  async execute(options: IQueryOptions): Promise<IPagedResult<UserModel>> {
    const response = await this.getUserPagedRepository.execute({
      ...options,
      columnsComparison: ["name", "email"],
      softDeleteFilter: true,
    });
    return response;
  }
}
