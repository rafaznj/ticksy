import { Inject, Injectable } from "@nestjs/common";
import * as argon2 from "argon2";

import { BaseCreateService } from "../../../shared/base/services/create.service";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { CreateUserDto } from "../dto/create-user.dm";
import { CreateUserRepository } from "../repositories/create.repository";
import { ICreateUserService } from "./contracts/create";

@Injectable()
export class CreateUserService
  extends BaseCreateService<CreateUserDto>
  implements ICreateUserService
{
  constructor(
    @Inject(REPOSITORY_TOKENS.CreateUserRepository)
    private readonly createUserRepository: CreateUserRepository,
  ) {
    super(createUserRepository);
  }

  async execute(data: CreateUserDto): Promise<CreateUserDto> {
    const hashedPassword = await argon2.hash(data.password);
    return super.execute({ ...data, password: hashedPassword });
  }
}
