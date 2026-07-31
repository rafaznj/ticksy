import { inject, injectable } from "inversify";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { UserEntity } from "../entity/user.entity";
import type { IGetUserByEmailRepository } from "../repositories/contracts/get-by-email";
import type { IGetUserByEmailService } from "./contracts/get-by-email";
import type { AppError } from "@/shared/errors/app-error";
import { handleResponseService } from "@/shared/errors/handle-response-service";

@injectable()
export class GetUserByEmailService implements IGetUserByEmailService {
  constructor(
    @inject(REPOSITORY_TOKENS.GetUserByEmailRepository)
    private readonly repository: IGetUserByEmailRepository,
  ) {}

  async execute(email: string): Promise<UserEntity | AppError> {
    const response = await this.repository.execute(email);

    return handleResponseService(response);
  }
}
