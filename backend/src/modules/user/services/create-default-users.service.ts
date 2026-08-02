import { Inject, Injectable } from "@nestjs/common";

import { UserModel } from "../models/user-model";
import { ICreateDefaultUsersService } from "./contracts/create-default-users";
import type { ICreateUserService } from "./contracts/create";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import { UserRoleEnum } from "../enums/roles.enum";
import { CreateUserDto } from "../dtos/create.dto";
import { AppException } from "../../../shared/exceptions/app-exception";

@Injectable()
export class CreateDefaultUsersService implements ICreateDefaultUsersService {
  constructor(
    @Inject(SERVICE_TOKENS.CreateUserService)
    private readonly createUserService: ICreateUserService,
  ) {}

  async execute(): Promise<void> {
    const seedUsers: CreateUserDto[] = [
      {
        name: "Administrator",
        email: "admin@email.com",
        password: "@Aa12345",
        role: UserRoleEnum.ADMIN,
      },
      {
        name: "Employee",
        email: "employee@email.com",
        password: "@Aa12345",
        role: UserRoleEnum.EMPLOYEE,
      },
      {
        name: "Technical Assistance",
        email: "technical_assistance@email.com",
        password: "@Aa12345",
        role: UserRoleEnum.TECHNICAL_ASSISTANCE,
      },
    ];

    for (const user of seedUsers) {
      await this.create(user);
    }
  }

  private async create(dto: CreateUserDto): Promise<UserModel | null> {
    try {
      return await this.createUserService.execute(dto);
    } catch (error) {
      if (error instanceof AppException && error.hasKey("auth.errors.emailAlreadyExists")) {
        return null;
      }
      throw error;
    }
  }
}
