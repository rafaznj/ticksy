import { inject, injectable } from "inversify";
import { BaseUpdateService } from "@/shared/base/services/update.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { UpdateUserData } from "../data/update.data";
import type { IUpdateUserRepository } from "../repositories/contracts/update";
import type { IUpdateUserService } from "./contracts/update";

@injectable()
export class UpdateUserService
  extends BaseUpdateService<UpdateUserData>
  implements IUpdateUserService
{
  constructor(
    @inject(REPOSITORY_TOKENS.UpdateUserRepository)
    repository: IUpdateUserRepository,
  ) {
    super(repository);
  }
}
