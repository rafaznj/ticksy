import { inject, injectable } from "inversify";

import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { LoginData } from "@/modules/auth/data/login.data";
import type { ILoginRepository } from "./contracts/login";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import type { APIResponse } from "@/shared/interfaces/api-response";
import type { LoginDto } from "@/modules/auth/dto/login.dto";

@injectable()
export class LoginRepository implements ILoginRepository {
  private basePath = "auth";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(dto: LoginData): Promise<APIResponse<LoginDto> | AppError> {
    const response = await this.axiosSingleton.client.post<APIResponse<LoginDto> | AppError>(
      `${this.basePath}/login`,
      dto,
    );

    return handleRepositoryResponse(response);
  }
}
