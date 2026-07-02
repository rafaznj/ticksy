import { Inject, Injectable } from "@nestjs/common";
import { BaseDeleteService } from "../../../shared/base/services/delete.service";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IDeleteUserRepository } from "../repositories/contracts/delete";

@Injectable()
export class DeleteUserService extends BaseDeleteService {
  constructor(
    @Inject(REPOSITORY_TOKENS.DeleteUserRepository)
    private readonly deleteUserRepository: IDeleteUserRepository,
  ) {
    super(deleteUserRepository);
  }
}
