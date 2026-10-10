import { inject, injectable } from "inversify";
import type { IConfirmPasswordRepository } from "../repositories/contracts/confirm-password";
import type { IConfirmPasswordService } from "./contracts/confirm-password";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { AppError } from "@/shared/errors/app-error";
import { handleServiceResponse } from "@/shared/interfaces/handle-service-response";

@injectable()
export class ConfirmPasswordService implements IConfirmPasswordService {
  constructor(
    @inject(REPOSITORY_TOKENS.ConfirmPasswordRepository)
    private readonly confirmPasswordRepository: IConfirmPasswordRepository,
  ) {}

  async execute(password: string): Promise<void | AppError> {
    const response = await this.confirmPasswordRepository.execute(password);

    return handleServiceResponse(response);
  }
}
