import { injectable } from "inversify";
import { BaseCreateRepository } from "@/shared/base/repositories/create.repository";
import type { CreateUserDto } from "../dto/create-user.dto";
import type { User } from "../entity/user.entity";
import type { ICreateUserRepository } from "./contracts/create";

@injectable()
export class CreateUserRepository
  extends BaseCreateRepository<CreateUserDto, User>
  implements ICreateUserRepository
{
  constructor() {
    super("/user");
  }
}
