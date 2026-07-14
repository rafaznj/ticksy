import { inject, injectable } from "inversify";

import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { LoginResponse } from "@/modules/auth/dto/login-response";
import type { LoginDto } from "@/modules/auth/dto/login.dto";
import type { ILoginRepository } from "@/modules/auth/repositories/contracts/login";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";

@injectable()
export class LoginRepository implements ILoginRepository {
  private basePath = "auth";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(dto: LoginDto): Promise<LoginResponse> {
    const { data } = await this.axiosSingleton.client.post<LoginResponse>(
      `${this.basePath}/login`,
      dto,
    );
    return data;
  }
}
