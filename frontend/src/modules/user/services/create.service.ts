import { BaseCreateService } from "@/shared/base/services/create.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { CreateUserDto } from "../dto/create-user.dto";
import type { UserEntity } from "../entity/user.entity";
import type { ICreateUserRepository } from "../repositories/contracts/create";
import type { ICreateUserService } from "./contracts/create";
import { inject, injectable } from "inversify";

@injectable()
export class CreateUserService
  extends BaseCreateService<CreateUserDto, UserEntity>
  implements ICreateUserService
{
  constructor(
    @inject(REPOSITORY_TOKENS.CreateUserRepository)
    repository: ICreateUserRepository,
  ) {
    super(repository);
  }
}
