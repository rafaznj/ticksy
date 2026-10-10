import { injectable, injectFromBase } from "inversify";
import { BaseGetByIdRepository } from "@/shared/base/repositories/get-by-id.repository";
import type { IGetUserByIdRepository } from "./contracts/get-by-id";
import type { UserPagedDto } from "@/modules/user/dto/user-paged.dto";

@injectFromBase()
@injectable()
export class GetUserByIdRepository
  extends BaseGetByIdRepository<UserPagedDto>
  implements IGetUserByIdRepository
{
  constructor() {
    super("/user");
  }
}
