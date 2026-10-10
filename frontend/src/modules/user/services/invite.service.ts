import { inject, injectable } from "inversify";
import type { IInviteUserRepository } from "../repositories/contracts/invite";
import type { IInviteUserService } from "./contracts/invite";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { AppError } from "@/shared/errors/app-error";
import { handleServiceResponse } from "@/shared/interfaces/handle-service-response";
import type { InviteUserData } from "@/modules/user/data/invite.data";

@injectable()
export class InviteUserService implements IInviteUserService {
  constructor(
    @inject(REPOSITORY_TOKENS.InviteUserRepository)
    private readonly inviteUserRepository: IInviteUserRepository,
  ) {}

  async execute(data: InviteUserData): Promise<void | AppError> {
    const response = await this.inviteUserRepository.execute(data);

    return handleServiceResponse(response);
  }
}
