import { Inject, Injectable } from "@nestjs/common";

import { UserModel } from "../models/user-model";
import { ICreateAdminUserService } from "./contracts/create-admin";
import type { ICreateUserService } from "./contracts/create";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import { UserRoleEnum } from "../enums/roles.enum";
import { CreateUserDto } from "../dtos/create.dto";
import { AppException } from "../../../shared/exceptions/app-exception";

@Injectable()
export class CreateAdminUserService implements ICreateAdminUserService {
  constructor(
    @Inject(SERVICE_TOKENS.CreateUserService)
    private readonly createUserService: ICreateUserService,
  ) {}

  async execute(): Promise<UserModel | null> {
    const adminUser: CreateUserDto = {
      name: "Administrator",
      email: "admin@email.com",
      password: "@Aa12345",
      role: UserRoleEnum.ADMIN,
    };

    try {
      return await this.createUserService.execute(adminUser);
    } catch (error) {
      if (error instanceof AppException && error.hasKey("auth.errors.emailAlreadyExists")) {
        return null;
      }
      throw error;
    }
  }
}
