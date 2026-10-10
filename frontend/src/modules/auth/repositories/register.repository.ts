import { inject, injectable } from "inversify";

import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import type { IRegisterRepository } from "@/modules/auth/repositories/contracts/register";
import type { RegisterDto } from "@/modules/auth/dto/register.dto";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import type { APIResponse } from "@/shared/interfaces/api-response";
import type { CreateUserData } from "@/modules/user/data/create.data";

@injectable()
export class RegisterRepository implements IRegisterRepository {
  private basePath = "auth";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(data: CreateUserData): Promise<APIResponse<RegisterDto> | AppError> {
    const response = await this.axiosSingleton.client.post<APIResponse<RegisterDto> | AppError>(
      `${this.basePath}/register`,
      data,
    );

    return handleRepositoryResponse(response);
  }
}
