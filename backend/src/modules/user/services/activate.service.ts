import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { AppException } from "../../../shared/exceptions/app-exception";
import type { IActivateUserRepository } from "../repositories/contracts/activate";
import { IActivateUserService } from "./contracts/activate";

@Injectable()
export class ActivateUserService implements IActivateUserService {
  constructor(
    @Inject(REPOSITORY_TOKENS.ActivateUserRepository)
    private readonly activateUserRepository: IActivateUserRepository,
  ) {}
  async execute(id: string): Promise<boolean> {
    const activated = await this.activateUserRepository.execute(id);

    if (!activated) {
      throw AppException.internalServerError("user.errors.activateFailed");
    }

    return activated;
  }
}
