import { Inject } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { CreateUserDto } from "../dto/create-user.dto";
import { IGetUserByEmailService } from "./contracts/get-by-email";
import type { IGetUserByEmailRepository } from "../repositories/contracts/get-by-email";

export default class GetUserByEmailService implements IGetUserByEmailService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetUserByEmailRepository)
    private readonly getUserByEmailRepository: IGetUserByEmailRepository,
  ) {}

  async execute(email: string): Promise<CreateUserDto | null> {
    const response = await this.getUserByEmailRepository.execute(email);

    return response;
  }
}
