import { Inject, Injectable } from "@nestjs/common";
import { BaseDeleteService } from "../../../shared/base/services/delete.service";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IDeleteUserRepository } from "../repositories/contracts/delete";
import { IDeleteUserService } from "./contracts/delete";

@Injectable()
export class DeleteUserService extends BaseDeleteService implements IDeleteUserService {
  constructor(
    @Inject(REPOSITORY_TOKENS.DeleteUserRepository)
    private readonly deleteUserRepository: IDeleteUserRepository,
  ) {
    super(deleteUserRepository);
  }
}
