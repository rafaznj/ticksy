import { inject, injectable } from "inversify";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { User } from "../entity/user.entity";
import type { IGetUserByEmailRepository } from "../repositories/contracts/get-by-email";
import type { IGetUserByEmailService } from "./contracts/get-by-email";

@injectable()
export class GetUserByEmailService implements IGetUserByEmailService {
  constructor(
    @inject(REPOSITORY_TOKENS.GetUserByEmailRepository)
    private readonly repository: IGetUserByEmailRepository,
  ) {}

  async execute(email: string): Promise<User | null> {
    return this.repository.execute(email);
  }
}
