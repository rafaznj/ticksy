import { inject, injectable } from "inversify";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { IDeactivateUserRepository } from "../repositories/contracts/deactivate";
import type { IDeactivateUserService } from "./contracts/deactivate";
import { AppError } from "@/shared/errors/app-error";
import { handleResponseService } from "@/shared/errors/handle-response-service";

@injectable()
export class DeactivateUserService implements IDeactivateUserService {
  constructor(
    @inject(REPOSITORY_TOKENS.DeactivateUserRepository)
    private readonly repository: IDeactivateUserRepository,
  ) {}

  async execute(id: string): Promise<boolean | AppError> {
    const response = await this.repository.execute(id);

    return handleResponseService(response);
  }
}
