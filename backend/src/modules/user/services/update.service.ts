import { Inject, Injectable } from "@nestjs/common";
import type { IUpdateUserService } from "./contracts/update";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { BaseUpdateService } from "../../../shared/base/services/update.service";
import type { IUpdateUserRepository } from "../repositories/contracts/update";
import { UpdateUserData } from "../data/update.data";

@Injectable()
export class UpdateUserService
  extends BaseUpdateService<UpdateUserData>
  implements IUpdateUserService
{
  constructor(
    @Inject(REPOSITORY_TOKENS.UpdateUserRepository)
    updateUserRepository: IUpdateUserRepository,
  ) {
    super(updateUserRepository);
  }
}
