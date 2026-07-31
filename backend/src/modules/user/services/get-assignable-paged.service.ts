import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IGetAssignableUsersPagedRepository } from "../repositories/contracts/get-assignable-paged";
import type { IGetAssignableUsersPagedService } from "./contracts/get-assignable-paged";
import { IPagedResult } from "../../../shared/types/paged-result";
import { IQueryOptions } from "../../../shared/types/query-options";
import { UserModel } from "../models/user-model";

@Injectable()
export class GetAssignableUsersPagedService implements IGetAssignableUsersPagedService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetAssignableUsersPagedRepository)
    private readonly getAssignableUsersPagedRepository: IGetAssignableUsersPagedRepository,
  ) {}

  async execute(options: IQueryOptions): Promise<IPagedResult<UserModel>> {
    return this.getAssignableUsersPagedRepository.execute(options);
  }
}
