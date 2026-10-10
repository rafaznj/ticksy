import { inject, injectable } from "inversify";

import { useAuthStore } from "@/lib/zustand/use-auth";
import type { LoginData } from "@/modules/auth/data/login.data";
import type { ILoginRepository } from "@/modules/auth/repositories/contracts/login";
import type { ILoginService } from "@/modules/auth/services/contracts/login";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { AppError } from "@/shared/errors/app-error";
import { handleServiceResponse } from "@/shared/interfaces/handle-service-response";
import type { LoginDto } from "@/modules/auth/dto/login.dto";

@injectable()
export class LoginService implements ILoginService {
  constructor(
    @inject(REPOSITORY_TOKENS.LoginRepository)
    private readonly loginRepository: ILoginRepository,
  ) {}

  async execute(dto: LoginData): Promise<LoginDto | AppError> {
    const response = await this.loginRepository.execute(dto);

    if (response instanceof AppError) {
      throw response;
    }

    useAuthStore.getState().setAuth(response.data.accessToken, response.data.user);

    return handleServiceResponse(response);
  }
}
