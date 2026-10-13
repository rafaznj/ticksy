import type { ForgotPasswordData } from "@/modules/user/data/forgot-password";
import type { IForgotPasswordUserRepository } from "@/modules/user/repositories/contracts/forgot-password";
import type { IForgotPasswordUserService } from "@/modules/user/services/contracts/forgot-password";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { AppError } from "@/shared/errors/app-error";
import { handleServiceResponse } from "@/shared/interfaces/handle-service-response";
import { inject } from "inversify";

export class ForgotPasswordUserService implements IForgotPasswordUserService {
  constructor(
    @inject(REPOSITORY_TOKENS.ForgotPasswordUserRepository)
    private readonly forgotPasswordUserRepository: IForgotPasswordUserRepository,
  ) {}

  async execute(data: ForgotPasswordData): Promise<void | AppError> {
    const response = await this.forgotPasswordUserRepository.execute(data);

    return handleServiceResponse(response);
  }
}
