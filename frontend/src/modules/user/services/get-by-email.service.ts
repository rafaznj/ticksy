import { inject, injectable } from "inversify";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { UserEntity } from "../entity/user.entity";
import type { IGetUserByEmailRepository } from "../repositories/contracts/get-by-email";
import type { IGetUserByEmailService } from "./contracts/get-by-email";
import type { AppError } from "@/shared/errors/app-error";

@injectable()
export class GetUserByEmailService implements IGetUserByEmailService {
  constructor(
    @inject(REPOSITORY_TOKENS.GetUserByEmailRepository)
    private readonly repository: IGetUserByEmailRepository,
  ) {}

  async execute(email: string): Promise<UserEntity | AppError> {
    return this.repository.execute(email);
  }
}
