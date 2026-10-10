import { inject, injectable } from "inversify";
import { BaseGetByIdService } from "@/shared/base/services/get-by-id.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { IGetUserByIdRepository } from "../repositories/contracts/get-by-id";
import type { IGetUserByIdService } from "./contracts/get-by-id";
import type { UserPagedDto } from "@/modules/user/dto/user-paged.dto";

@injectable()
export class GetUserByIdService
  extends BaseGetByIdService<UserPagedDto>
  implements IGetUserByIdService
{
  constructor(
    @inject(REPOSITORY_TOKENS.GetUserByIdRepository)
    repository: IGetUserByIdRepository,
  ) {
    super(repository);
  }
}
