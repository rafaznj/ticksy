import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import * as argon2 from "argon2";

import { BaseCreateService } from "../../../shared/base/services/create.service";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { CreateUserDto } from "../dto/create-user.dto";
import { ICreateUserService } from "./contracts/create";
import type { ICreateUserRepository } from "../repositories/contracts/create";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { IGetUserByEmailService } from "./contracts/get-by-email";

@Injectable()
export class CreateUserService
  extends BaseCreateService<CreateUserDto>
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

  async execute(data: CreateUserDto): Promise<CreateUserDto> {
    const existingUser = await this.getUserByEmailService.execute(data.email);
    if (existingUser) {
      throw new HttpException("User with this email already exists", HttpStatus.CONFLICT);
    }

    const hashedPassword = await argon2.hash(data.password);
    return super.execute({ ...data, password: hashedPassword });
  }
}
