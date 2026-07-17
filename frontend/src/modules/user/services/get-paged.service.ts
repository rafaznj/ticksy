import type { UserEntity } from "@/modules/user/entity/user.entity";
import type { IGetUserPagedRepository } from "@/modules/user/repositories/contracts/get-paged";
import type { IGetUserPagedService } from "@/modules/user/services/contracts/get-paged";
import { BaseGetPagedRService } from "@/shared/base/services/get-paged.service";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { inject, injectable } from "inversify";

@injectable()
export class GetUserPagedService
  extends BaseGetPagedRService<UserEntity>
  implements IGetUserPagedService
{
  constructor(
    @inject(SERVICE_TOKENS.GetUserPagedService)
    getUserPagedRepository: IGetUserPagedRepository,
  ) {
    super(getUserPagedRepository);
  }
}
