import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { UserRoleEnum } from "../enums/role.enum";
import type { IGetUserIdsByRoleRepository } from "../repositories/contracts/get-ids-by-role";
import { IGetUserIdsByRoleService } from "./contracts/get-ids-by-role";

@Injectable()
export class GetUserIdsByRoleService implements IGetUserIdsByRoleService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetUserIdsByRoleRepository)
    private readonly getUserIdsByRoleRepository: IGetUserIdsByRoleRepository,
  ) {}

  async execute(role: UserRoleEnum): Promise<string[]> {
    const response = await this.getUserIdsByRoleRepository.execute(role);
    return response;
  }
}
