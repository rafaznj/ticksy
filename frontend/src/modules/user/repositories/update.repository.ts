import { injectable } from "inversify";
import { BaseUpdateRepository } from "@/shared/base/repositories/update.repository";
import type { UpdateUserDto } from "../dto/update-user.dto";
import type { User } from "../entity/user.entity";
import type { IUpdateUserRepository } from "./contracts/update";

@injectable()
export class UpdateUserRepository
  extends BaseUpdateRepository<UpdateUserDto, User>
  implements IUpdateUserRepository
{
  constructor() {
    super("/user");
  }
}
