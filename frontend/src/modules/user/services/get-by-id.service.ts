import { inject, injectable } from "inversify";
import { BaseGetByIdService } from "@/shared/base/services/get-by-id.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { UserEntity } from "../entity/user.entity";
import type { IGetUserByIdRepository } from "../repositories/contracts/get-by-id";
import type { IGetUserByIdService } from "./contracts/get-by-id";

@injectable()
export class GetUserByIdService
  extends BaseGetByIdService<UserEntity>
  implements IGetUserByIdService
{
  constructor(
    @inject(REPOSITORY_TOKENS.GetUserByIdRepository)
    repository: IGetUserByIdRepository,
  ) {
    super(repository);
  }
}
