import { inject, injectable } from "inversify";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { UserDto } from "../dto/user.dto";
import type { IGetUserByEmailRepository } from "../repositories/contracts/get-by-email";
import type { IGetUserByEmailService } from "./contracts/get-by-email";
import type { AppError } from "@/shared/errors/app-error";
import { handleServiceResponse } from "@/shared/interfaces/handle-service-response";

@injectable()
export class GetUserByEmailService implements IGetUserByEmailService {
  constructor(
    @inject(REPOSITORY_TOKENS.GetUserByEmailRepository)
    private readonly repository: IGetUserByEmailRepository,
  ) {}

  async execute(email: string): Promise<UserDto | AppError> {
    const response = await this.repository.execute(email);

    return handleServiceResponse(response);
  }
}
