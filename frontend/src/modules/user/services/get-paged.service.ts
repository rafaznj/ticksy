import type { UserPagedDto } from "@/modules/user/dto/user-paged.dto";
import type { IGetUserPagedRepository } from "@/modules/user/repositories/contracts/get-paged";
import type { IGetUserPagedService } from "@/modules/user/services/contracts/get-paged";
import { BaseGetPagedService } from "@/shared/base/services/get-paged.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { inject, injectable } from "inversify";

@injectable()
export class GetUserPagedService
  extends BaseGetPagedService<UserPagedDto>
  implements IGetUserPagedService
{
  constructor(
    @inject(REPOSITORY_TOKENS.GetUserPagedRepository)
    getUserPagedRepository: IGetUserPagedRepository,
  ) {
    super(getUserPagedRepository);
  }
}
