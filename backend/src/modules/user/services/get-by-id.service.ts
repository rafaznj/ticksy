import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { BaseGetByIdService } from "../../../shared/base/services/get-by-id.service";
import { IGetUserByIdService } from "./contracts/get-by-id";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IGetUserByIdRepository } from "../repositories/contracts/get-by-id";

@Injectable()
export class GetUserByIdService
  extends BaseGetByIdService<CreateUserDto>
  implements IGetUserByIdService
{
  constructor(
    @Inject(REPOSITORY_TOKENS.GetUserByIdRepository)
    private readonly getUserByIdRepository: IGetUserByIdRepository,
  ) {
    super(getUserByIdRepository);
  }
}
