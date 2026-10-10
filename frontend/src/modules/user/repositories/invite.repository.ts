import { inject, injectable } from "inversify";
import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { IInviteUserRepository } from "./contracts/invite";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import type { APIResponse } from "@/shared/interfaces/api-response";
import type { InviteUserData } from "@/modules/user/data/invite.data";

@injectable()
export class InviteUserRepository implements IInviteUserRepository {
  private readonly basePath = "user";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(data: InviteUserData): Promise<APIResponse<void> | AppError> {
    const response = await this.axiosSingleton.client.post<APIResponse<void>>(
      `${this.basePath}/invite`,
      data,
    );

    return handleRepositoryResponse(response);
  }
}
