import { inject, injectable } from "inversify";

import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import type { IRegisterRepository } from "@/modules/auth/repositories/contracts/register";
import type { CreateUserDto } from "@/modules/user/dto/create.dto";
import type { RegisterResponse } from "@/modules/auth/dto/register-response";
import { handleRepositoryResponse } from "@/shared/response/handle-repository-response";

@injectable()
export class RegisterRepository implements IRegisterRepository {
  private basePath = "auth";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(data: CreateUserDto): Promise<RegisterResponse | AppError> {
    const response = await this.axiosSingleton.client.post<RegisterResponse>(
      `${this.basePath}/register`,
      data,
    );

    return handleRepositoryResponse(response);
  }
}
