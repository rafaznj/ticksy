import { Inject, Injectable } from "@nestjs/common";
import * as argon2 from "argon2";

import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { ICreateUserService } from "./contracts/create";
import type { ICreateUserRepository } from "../repositories/contracts/create";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { IGetUserByEmailService } from "./contracts/get-by-email";
import { AppException } from "../../../shared/exceptions/app-exception";
import { BaseCreateService } from "../../../shared/base/services/create.service";
import { UserViewModel } from "../view-models/user.vm";
import { CreateUserData } from "../data/create.data";

@Injectable()
export class CreateUserService
  extends BaseCreateService<CreateUserData, UserViewModel>
  implements ICreateUserService
{
  constructor(
    @Inject(REPOSITORY_TOKENS.CreateUserRepository)
    createUserRepository: ICreateUserRepository,
    @Inject(SERVICE_TOKENS.GetUserByEmailService)
    private readonly getUserByEmailService: IGetUserByEmailService,
  ) {
    super(createUserRepository);
  }

  async execute(data: CreateUserData): Promise<UserViewModel> {
    const existingUser = await this.getUserByEmailService.execute(data.email);

    if (existingUser?.email) {
      throw AppException.conflict("auth.messages.errors.emailAlreadyExists");
    }

    const hashedPassword = await argon2.hash(data.password);
    return super.execute({
      ...data,
      password: hashedPassword,
      mustChangePassword: data.mustChangePassword ?? false,
    });
  }
}
