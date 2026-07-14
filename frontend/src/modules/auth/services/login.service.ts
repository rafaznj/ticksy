import { inject, injectable } from "inversify";

import { useAuthStore } from "@/lib/zustand/use-auth";
import type { LoginResponse } from "@/modules/auth/dto/login-response";
import type { LoginDto } from "@/modules/auth/dto/login.dto";
import type { ILoginRepository } from "@/modules/auth/repositories/contracts/login";
import type { ILoginService } from "@/modules/auth/services/contracts/login";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";

@injectable()
export class LoginService implements ILoginService {
  constructor(
    @inject(REPOSITORY_TOKENS.LoginRepository)
    private readonly loginRepository: ILoginRepository,
  ) {}

  async execute(dto: LoginDto): Promise<LoginResponse> {
    const response = await this.loginRepository.execute(dto);

    useAuthStore.getState().setAuth(response.accessToken, response.user);
    return response;
  }
}
