import { Inject, Injectable } from "@nestjs/common";
import { BaseGetByIdService } from "../../../shared/base/services/get-by-id.service";
import { IGetUserByIdService } from "./contracts/get-by-id";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IGetUserByIdRepository } from "../repositories/contracts/get-by-id";
import { UserEntity } from "../entity/user.entity";

@Injectable()
export class GetUserByIdService
  extends BaseGetByIdService<UserEntity>
  implements IGetUserByIdService
{
  constructor(
    @Inject(REPOSITORY_TOKENS.GetUserByIdRepository)
    getUserByIdRepository: IGetUserByIdRepository,
  ) {
    super(getUserByIdRepository);
  }
}
