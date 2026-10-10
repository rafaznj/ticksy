import { inject, injectable } from "inversify";

import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { AppError } from "@/shared/errors/app-error";
import type { IRegisterService } from "@/modules/auth/services/contracts/register";
import type { RegisterDto } from "@/modules/auth/dto/register.dto";
import type { IRegisterRepository } from "@/modules/auth/repositories/contracts/register";
import { useAuthStore } from "@/lib/zustand/use-auth";
import { handleServiceResponse } from "@/shared/interfaces/handle-service-response";
import type { CreateUserData } from "@/modules/user/data/create.data";

@injectable()
export class RegisterService implements IRegisterService {
  constructor(
    @inject(REPOSITORY_TOKENS.RegisterRepository)
    private readonly registerRepository: IRegisterRepository,
  ) {}

  async execute(data: CreateUserData): Promise<RegisterDto | AppError> {
    const response = await this.registerRepository.execute(data);

    if (response instanceof AppError) {
      throw response;
    }

    useAuthStore.getState().setAuth(response.data.accessToken, response.data.user);

    return handleServiceResponse(response);
  }
}
