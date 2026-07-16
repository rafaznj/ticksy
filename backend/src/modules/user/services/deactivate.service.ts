import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IDeactivateUserService } from "./contracts/deactivate";
import type { IDeactivateUserRepository } from "../repositories/contracts/deactivate";
import { AppException } from "../../../shared/exceptions/app-exception";

@Injectable()
export class DeactivateUserService implements IDeactivateUserService {
  constructor(
    @Inject(REPOSITORY_TOKENS.DeactivateUserRepository)
    private readonly deactivateUserRepository: IDeactivateUserRepository,
  ) {}
  async execute(id: string): Promise<boolean> {
    const deactivated = await this.deactivateUserRepository.execute(id);

    if (!deactivated) {
      throw AppException.internalServerError("user.errors.deactivateFailed");
    }

    return deactivated;
  }
}
