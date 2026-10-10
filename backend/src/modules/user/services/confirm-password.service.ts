import { Inject, Injectable } from "@nestjs/common";
import * as argon2 from "argon2";

import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IUpdateUserRepository } from "../repositories/contracts/update";
import { IConfirmPasswordService } from "./contracts/confirm-password";

@Injectable()
export class ConfirmPasswordService implements IConfirmPasswordService {
  constructor(
    @Inject(REPOSITORY_TOKENS.UpdateUserRepository)
    private readonly updateUserRepository: IUpdateUserRepository,
  ) {}

  async execute(userId: string, password: string): Promise<void> {
    await this.updateUserRepository.execute(userId, {
      password: await argon2.hash(password),
      mustChangePassword: false,
    });
  }
}
