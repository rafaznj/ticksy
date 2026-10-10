import { injectable, injectFromBase } from "inversify";
import { BaseUpdateRepository } from "@/shared/base/repositories/update.repository";
import type { UpdateUserData } from "../data/update.data";
import type { IUpdateUserRepository } from "./contracts/update";

@injectFromBase()
@injectable()
export class UpdateUserRepository
  extends BaseUpdateRepository<UpdateUserData>
  implements IUpdateUserRepository
{
  constructor() {
    super("/user");
  }
}
