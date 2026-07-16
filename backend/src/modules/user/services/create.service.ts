import { Inject, Injectable } from "@nestjs/common";
import * as argon2 from "argon2";

import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { ICreateUserService } from "./contracts/create";
import type { ICreateUserRepository } from "../repositories/contracts/create";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { IGetUserByEmailService } from "./contracts/get-by-email";
import { AppException } from "../../../shared/exceptions/app-exception";
import { BaseCreateService } from "../../../shared/base/services/create.service";
import { UserEntity } from "../entity/user.entity";
import { CreateUserDto } from "../dto/create.dto";

@Injectable()
export class CreateUserService
  extends BaseCreateService<CreateUserDto, UserEntity>
  implements ICreateUserService
{
  constructor(
    @Inject(REPOSITORY_TOKENS.CreateUserRepository)
    private readonly createUserRepository: ICreateUserRepository,
    @Inject(SERVICE_TOKENS.GetUserByEmailService)
    private readonly getUserByEmailService: IGetUserByEmailService,
  ) {
    super(createUserRepository);
  }

  async execute(data: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.getUserByEmailService.execute(data.email);

    if (existingUser) {
      throw AppException.conflict("auth.errors.emailAlreadyExists");
    }

    const hashedPassword = await argon2.hash(data.password);
    return super.execute({ ...data, password: hashedPassword });
  }
}
