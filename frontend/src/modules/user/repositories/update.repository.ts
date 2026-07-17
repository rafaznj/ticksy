import { injectable, injectFromBase } from "inversify";
import { BaseUpdateRepository } from "@/shared/base/repositories/update.repository";
import type { UpdateUserDto } from "../dto/update-user.dto";
import type { UserEntity } from "../entity/user.entity";
import type { IUpdateUserRepository } from "./contracts/update";

@injectFromBase()
@injectable()
export class UpdateUserRepository
  extends BaseUpdateRepository<UpdateUserDto, UserEntity>
  implements IUpdateUserRepository
{
  constructor() {
    super("/user");
  }
}
