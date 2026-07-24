import { Inject, Injectable } from "@nestjs/common";

import { UserModel } from "../models/user-model";
import { ICreateAdminUserService } from "./contracts/create-admin";
import type { ICreateUserService } from "./contracts/create";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import { UserRoleEnum } from "../enums/roles.enum";
import { CreateUserDto } from "../dtos/create.dto";

@Injectable()
export class CreateAdminUserService implements ICreateAdminUserService {
  constructor(
    @Inject(SERVICE_TOKENS.CreateUserService)
    private readonly createUserService: ICreateUserService,
  ) {}

  async execute(): Promise<UserModel> {
    const adminUser: CreateUserDto = {
      name: "Administrador",
      email: "admin@email.com",
      password: "@Aa12345",
      role: UserRoleEnum.ADMIN,
    };

    return this.createUserService.execute(adminUser);
  }
}
