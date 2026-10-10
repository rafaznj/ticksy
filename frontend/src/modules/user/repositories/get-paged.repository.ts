import type { UserPagedDto } from "@/modules/user/dto/user-paged.dto";
import type { IGetUserPagedRepository } from "@/modules/user/repositories/contracts/get-paged";
import { BaseGetPagedRepository } from "@/shared/base/repositories/get-paged.repository";
import { injectable, injectFromBase } from "inversify";

@injectFromBase()
@injectable()
export class GetUserPagedRepository
  extends BaseGetPagedRepository<UserPagedDto>
  implements IGetUserPagedRepository
{
  constructor() {
    super("/user");
  }
}
