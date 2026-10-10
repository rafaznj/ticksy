import { injectable, injectFromBase } from "inversify";
import { BaseCreateRepository } from "@/shared/base/repositories/create.repository";
import type { UserDto } from "../dto/user.dto";
import type { ICreateUserRepository } from "./contracts/create";
import type { CreateUserData } from "@/modules/user/data/create.data";

@injectFromBase()
@injectable()
export class CreateUserRepository
  extends BaseCreateRepository<CreateUserData, UserDto>
  implements ICreateUserRepository
{
  constructor() {
    super("/user");
  }
}
