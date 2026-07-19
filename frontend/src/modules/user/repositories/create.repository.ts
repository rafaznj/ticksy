import { injectable, injectFromBase } from "inversify";
import { BaseCreateRepository } from "@/shared/base/repositories/create.repository";
import type { CreateUserDto } from "../dto/create-user.dto";
import type { UserEntity } from "../entity/user.entity";
import type { ICreateUserRepository } from "./contracts/create";

@injectFromBase()
@injectable()
export class CreateUserRepository
  extends BaseCreateRepository<CreateUserDto, UserEntity>
  implements ICreateUserRepository
{
  constructor() {
    super("/user");
  }
}
