import { inject, injectable } from "inversify";

import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { AppError } from "@/shared/errors/app-error";
import type { IRegisterService } from "@/modules/auth/services/contracts/register";
import type { CreateUserDto } from "@/modules/user/dto/create-user.dto";
import type { RegisterResponse } from "@/modules/auth/dto/register-response";
import type { IRegisterRepository } from "@/modules/auth/repositories/contracts/register";

@injectable()
export class RegisterService implements IRegisterService {
  constructor(
    @inject(REPOSITORY_TOKENS.RegisterRepository)
    private readonly registerRepository: IRegisterRepository,
  ) {}

  async execute(data: CreateUserDto): Promise<RegisterResponse | AppError> {
    const response = await this.registerRepository.execute(data);

    if (response instanceof AppError) {
      throw response;
    }

    return response;
  }
}
