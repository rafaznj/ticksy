import { inject, injectable } from "inversify";

import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { LoginDto } from "@/modules/auth/dto/login.dto";
import type { LoginResponse } from "@/modules/auth/dto/login-response";
import type { ILoginRepository } from "./contracts/login";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleResponse } from "@/shared/errors/handle-response";

@injectable()
export class LoginRepository implements ILoginRepository {
  private basePath = "auth";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(dto: LoginDto): Promise<LoginResponse | AppError> {
    const response = await this.axiosSingleton.client.post<LoginResponse>(
      `${this.basePath}/login`,
      dto,
    );
    return handleResponse(response);
  }
}
