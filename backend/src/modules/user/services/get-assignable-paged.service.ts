import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IGetAssignableUsersPagedRepository } from "../repositories/contracts/get-assignable-paged";
import type { IGetAssignableUsersPagedService } from "./contracts/get-assignable-paged";
import { IQueryOptions } from "../../../shared/interfaces/query-options";
import { IPagedResult } from "../../../shared/interfaces/paged-result";
import { UserPagedViewModel } from "../view-models/user-paged.vm";

@Injectable()
export class GetAssignableUsersPagedService implements IGetAssignableUsersPagedService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetAssignableUsersPagedRepository)
    private readonly getAssignableUsersPagedRepository: IGetAssignableUsersPagedRepository,
  ) {}

  async execute(options: IQueryOptions): Promise<IPagedResult<UserPagedViewModel>> {
    const response = await this.getAssignableUsersPagedRepository.execute(options);
    return response;
  }
}
