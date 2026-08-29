import { inject, injectable } from "inversify";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { AppError } from "@/shared/errors/app-error";
import { handleServiceResponse } from "@/shared/response/handle-service-response";
import type { IActivateUserRepository } from "@/modules/user/repositories/contracts/activate";
import type { IActivateUserService } from "@/modules/user/services/contracts/activate";

@injectable()
export class ActivateUserService implements IActivateUserService {
  constructor(
    @inject(REPOSITORY_TOKENS.ActivateUserRepository)
    private readonly repository: IActivateUserRepository,
  ) {}

  async execute(id: string): Promise<boolean | AppError> {
    const response = await this.repository.execute(id);

    return handleServiceResponse(response);
  }
}
