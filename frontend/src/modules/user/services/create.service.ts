import { BaseCreateService } from "@/shared/base/services/create.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { UserDto } from "../dto/user.dto";
import type { ICreateUserRepository } from "../repositories/contracts/create";
import type { ICreateUserService } from "./contracts/create";
import { inject, injectable } from "inversify";
import type { CreateUserData } from "@/modules/user/data/create.data";

@injectable()
export class CreateUserService
  extends BaseCreateService<CreateUserData, UserDto>
  implements ICreateUserService
{
  constructor(
    @inject(REPOSITORY_TOKENS.CreateUserRepository)
    repository: ICreateUserRepository,
  ) {
    super(repository);
  }
}
