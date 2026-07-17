import type { UserEntity } from "@/modules/user/entity/user.entity";
import type { IGetUserPagedRepository } from "@/modules/user/repositories/contracts/get-paged";
import { BaseGetPagedRepository } from "@/shared/base/repositories/get-paged.repository";
import { injectable, injectFromBase } from "inversify";

@injectFromBase()
@injectable()
export class GetUserPagedRepository
  extends BaseGetPagedRepository<UserEntity>
  implements IGetUserPagedRepository
{
  constructor() {
    super("/user");
  }
}
